// @flow
import express from 'express'
import base64UrlSafe from 'urlsafe-base64'
import * as error from '../../utils/error'
import type { Request } from '../types'
import sdk from '../sdk'
import { shortIdToLong } from '../../utils/string'

const router = express.Router()

const notFoundError = new error.StatusError('Not found', 404)

router.get('/:laundryId/:id', async (req: Request, res, next) => {
  const {id, laundryId} = req.params
  const locale = req.locale || 'en'
  if (!base64UrlSafe.validate(id)) {
    return next(notFoundError)
  }

  const [l1, l2] = await Promise.all([
    await sdk.api.laundry.get(shortIdToLong(laundryId)).catch(() => null),
    await sdk.api.laundry.get(laundryId).catch(() => null)
  ])
  const laundry = l1 || l2
  if (!laundry) {
    return next(notFoundError)
  }
  const user = req.user
  if (!user) {
    return res.redirect(`/${locale}/auth/laundries/${laundryId}/${id}/?laundryName=${encodeURIComponent(laundry.name)}`)
  }
  if (user.demo) {
    return next(notFoundError)
  }
  try {
    await sdk.api.laundry.verifyInviteCode(laundry.id, {key: id})
    await sdk.api.laundry.addUser(laundry.id, user.id)
    res.redirect(`/${locale}/laundries/${laundry.id}`)
  } catch (err) {
    next(err)
  }
})

export default router
