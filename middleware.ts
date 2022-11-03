import { NextResponse } from 'next/server'

export async function middleware(req: any, _ev:any) {
    const { pathname } = req.nextUrl
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/colorpicker', req.url))
    }
    return NextResponse.next()
}
