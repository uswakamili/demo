import {AuthConfig} from "angular-oauth2-oidc";


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8083/auth/realms/saasy',
  redirectUri: window.location.origin + "/callback",
  clientId: 'cf-pkce',
  scope: 'openid profile email roles offline_access',
  responseType: 'code',
  showDebugInformation: true
}
