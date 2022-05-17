
export const registMsg={top:'You have successfully registered an account',
                        midT:'Now you will be redirected to LogIn area',
                        midB:'Please confirm email address (check spam too)'
                        };
export const chgPass={top:'You have successfully changed the password',
                            midT:'Now you will be redirected to LogIn area',
                            midB:'Your account password has changed. Use the new one'
                        };
export const unAuth={top:'You accessed a restricted resourse',
                        midT:'Now you will be redirected to sign up area ',
                        midB:'You are not authorized to access this resource'
};
export const recoverP={top:'A recovery email has been successfully sent ',
                        midT:'Now you will be redirected to signIn area',
                        midB:'Check your email. Click on the link to set a new password',
};

//@ URLs
export const passRecovEmailUrl='http://localhost:5000/api/reset-password';
export const setNewPassRecovUrl='http://localhost:5000/api/change-password';

//@ URL ADDRESSES API SERVER
export const attachURL='http://localhost:5000/photo/';
export const emoticonURL="http://localhost:5000/emoticons/";
//# deleteChat url
export const deleteChatURL="http://localhost:5000/api/deleteChat/";
export const avatarURL="http://localhost:5000/avatar/";

//@ load user profile URL
export const loadUserProfileURL="http://localhost:5000/api/loadUserProfile/";

//@ get avatars URL
export const getAvatarsURL="http://localhost:5000/api/getAvatars/";

//@update profile URL
export const updateProfileURL="http://localhost:5000/api/updateProfile/";

export const backgroundURL="http://localhost:5000/avatar/back.jpg";

//@chats URLs
export const displayChatURL="http://localhost:5000/api/chats/getChat/";
export const getEmoticonsURL="http://localhost:5000/api/emoticons/";
export const listChatsURL="http://localhost:5000/api/chats/getChatsList/";
export const listChatsURL2="http://localhost:5000/api/chats/receiveChatsList/";
export const writeChatURL='http://localhost:5000/api/chats/';

//loginA URL
export const loginAURL='http://localhost:5000/api/auth/';

//@ registerUserURL 
export const registerUserURL='http://localhost:5000/api/users/';
export const registerUserURLEmail='http://localhost:5000/api/confirmationEmail/';

//@ getUsersUrl
export const getUsersURL='http://localhost:5000/api/users/usersList/';

//@ fileUploadURl
export const fileUploadURL='http://localhost:5000/api/fileUpload/';
