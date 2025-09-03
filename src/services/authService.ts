import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export class AuthService {
  // Google Auth Provider
  static googleProvider = new GoogleAuthProvider();

  // Sign in with Google
  static async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const firebaseUser = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        // Update last login
        const userData = userDoc.data();
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...userData,
          lastLogin: new Date()
        }, { merge: true });
        
        return {
          id: firebaseUser.uid,
          ...userData
        } as User;
      } else {
        // Create new user document
        const userData: Omit<User, 'id'> = {
          email: firebaseUser.email!,
          name: firebaseUser.displayName || 'User',
          role: 'user',
          language: 'en',
          riskProfile: 'moderate',
          experienceLevel: 'beginner',
          createdAt: new Date(),
          lastLogin: new Date(),
          totalPoints: 0,
          badges: [],
          streak: 0,
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        
        return {
          id: firebaseUser.uid,
          ...userData
        };
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Sign up with email and password
  static async signUp(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update the user's display name
      await updateProfile(firebaseUser, { displayName: name });
      
      // Create user document in Firestore
      const userData: Omit<User, 'id'> = {
        email: firebaseUser.email!,
        name: name,
        role: 'user',
        language: 'en',
        riskProfile: 'moderate',
        experienceLevel: 'beginner',
        createdAt: new Date(),
        lastLogin: new Date(),
        totalPoints: 0,
        badges: [],
        streak: 0,
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return {
        id: firebaseUser.uid,
        ...userData
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Update last login
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...userData,
          lastLogin: new Date()
        }, { merge: true });
        
        return {
          id: firebaseUser.uid,
          ...userData
        } as User;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Sign out
  static async signOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            callback({
              id: firebaseUser.uid,
              ...userData
            } as User);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: Partial<User>) {
    try {
      await setDoc(doc(db, 'users', userId), updates, { merge: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get current user
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }
}
