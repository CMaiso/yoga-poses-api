import { Router } from 'express'
import {getAllPoses, getOnePose, getPosesByLevel} from '../handlers/pose';
import {getAllCategories, getCategoriesByLevel, getCategoryByLevel, getCategoryByName} from "../handlers/category";

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
router.get('/category/:level', getCategoriesByLevel)

/**
 * Style
 */
router.get('/style', () => {})
router.get('/style/:name', () => {})
router.get('/style/:level', () => {})

export default router
