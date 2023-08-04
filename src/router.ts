import { Router } from 'express'
import {getPoses} from './handlers/pose';
import {getCategories} from "./handlers/category";
import {getStyles} from "./handlers/style";

const router = Router()

/**
 * Pose
 */
router.get('/pose', getPoses)

/**
 * Category
 */
router.get('/category', getCategories)

/**
 * Style
 */
router.get('/style', getStyles)

export default router
