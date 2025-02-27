// import statusCodes along with GoogleSignin
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  
  // Somewhere in your code
  export const Signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response) {
        setState({ userInfo: response.data });
        console.log({ userInfo: response.data });
        console.log(response);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };