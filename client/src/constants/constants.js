
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
export const passRecovEmailUrl='/api/reset-password/';
export const setNewPassRecovUrl='/api/change-password';

//@ URL ADDRESSES API SERVER
export const attachURL='/photo/';
export const emoticonURL="/emoticons/";
//# deleteChat url
export const deleteChatURL="/api/deleteChat/";
export const avatarURL="/avatar/";

//@ load user profile URL
export const loadUserProfileURL="/api/loadUserProfile/";

//@ get avatars URL
export const getAvatarsURL="/api/getAvatars/";

//@update profile URL
export const updateProfileURL="0/api/updateProfile/";

export const backgroundURL="/avatar/back.jpg";

//@chats URLs
export const displayChatURL="/api/chats/getChat/";
export const getEmoticonsURL="/api/emoticons/";
export const listChatsURL="/api/chats/getChatsList/";
export const listChatsURL2="/api/chats/receiveChatsList/";
export const writeChatURL='/api/chats/';

//loginA URL
export const loginAURL='/api/auth/';

//@ registerUserURL 
export const registerUserURL='/api/users/';
export const registerUserURLEmail='/api/confirmationEmail/';

//@ getUsersUrl
export const getUsersURL='/api/users/usersList/';

//@ fileUploadURl
export const fileUploadURL='/api/fileUpload/';
