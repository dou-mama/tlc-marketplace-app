import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // localStorage.setItem('access_token', data.session.access_token);
    if (data.session) {
      localStorage.setItem('access_token', data.session.access_token);
    }
  }

  async logout() {
    await this.supabase.auth.signOut();
    localStorage.removeItem('access_token');
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.session) {
      localStorage.setItem('access_token', data.session.access_token);
    }
    // localStorage.setItem('access_token', data.session.access_token);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUser() {
    return this.supabase.auth.getUser();
  }
}

