import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest){
    if(req.nextUrl.pathname === '/api/auth/signin'){
        if(req.cookies.get('next-auth.session-token')){
            return NextResponse.redirect(new URL('/',req.nextUrl));
        }
    }
}


export const config = {
    matcher: [
        '/api/auth/signin'
    ]
}