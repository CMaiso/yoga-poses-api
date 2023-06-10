import { Router } from 'express'

const router = Router()

/**
 * Pose
 */
router.get('/pose', () => {})
router.get('/pose/:name', () => {})
router.get('/pose/:level', () => {})

/**
 * Category
 */
router.get('/category', () => {})
router.get('/category/:name', () => {})
router.get('/category/:level', () => {})

/**
 * Style
 */
router.get('/style', () => {})
router.get('/style/:name', () => {})
router.get('/style/:level', () => {})

export default router
