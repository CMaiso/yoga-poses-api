import { Router } from 'express'
import {getAllPoses, getOnePose, getPosesByLevel} from './handlers/pose';
import {getAllCategories, getCategoryByName} from "./handlers/category";
import {getAllStyles, getStyleByName, getStylesByLevel} from "./handlers/style";

const router = Router()

/**
 * Pose
 */
router.get('/pose', getAllPoses)
router.get('/pose/:name', getOnePose)
router.get('/pose/:level', getPosesByLevel)

/**
 * Category
 */
router.get('/category', getAllCategories)
router.get('/category/:name', getCategoryByName)

/**
 * Style
 */
router.get('/style', getAllStyles)
router.get('/style/:name', getStyleByName)
router.get('/style/:level', getStylesByLevel)

export default router
