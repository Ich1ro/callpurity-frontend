import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import dbConnect from '@/services/db'
import { IMenu, menuModel } from '@/data'
import { IMenuGETReponse } from '../type.dt'

export const GET = async (
  request: NextRequest
): Promise<NextResponse<IMenuGETReponse>> => {
  const headersList = headers()
  const token = headersList.get('token')
  if (token !== process.env.NEXT_PUBLIC_API_TOKEN) {
    return NextResponse.json({ response: '401 Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  let result: IMenu[] = await menuModel.find({}).sort({ sort_order: 1 }).exec()

  if (result.length === 0) {
    const menu = await menuModel.create({
      name: 'Система',
      parent: null,
      path: '',
      icon: 'SettingsOutlined',
      sort_order: 100,
    })

    await menuModel.create({
      name: 'Налаштування меню',
      parent: menu._id,
      path: '/menu',
      icon: 'ListOutlined',
      sort_order: 1,
    })

    result = await menuModel.find({}).sort({ sort_order: 1 }).exec()
  }

  return NextResponse.json({ success: true, data: result }, { status: 200 })
}
