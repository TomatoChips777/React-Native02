import * as React from 'react';
import { AuthProvider } from './AuthContext';
import RootStack from './src/navigations/RootStack';

export default function App() {
  return (
     <AuthProvider>
          <RootStack/>
    </AuthProvider>
    // <AuthProvider>
    //   <DrawerNavigator/>
    // </AuthProvider>
  );
}