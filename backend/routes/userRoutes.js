import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.route("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;