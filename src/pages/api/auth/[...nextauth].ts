import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import http from '@/data/http';
import {IUser} from '@/types';

export default NextAuth({
  secret: 'secret',
  providers: [
    CredentialsProvider<any>({
      async authorize(credentials: any): Promise<any> {
        const {name} = credentials;
        const res = await http.users.post({name});
        if (res.status === 201) return res.data;
        else return null;
      },
      credentials: undefined
    })
  ],
  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({session, token}) => {
      session.user = token.user as IUser;
      return session;
    }
  },
  pages: {
    signIn: '/login' //Need to define custom login page (if using)
  }
});
