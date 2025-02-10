import axiosClient from '../axiosClient'

const signIn = async (credentials) => {
    try {
        const response = await axiosClient.post('/user/login', credentials)
        if (response.data && response.data.success) {
            // console.log('Sign in response:', response.data.data)
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to sign in')
        }
    } catch (error) {
        console.error('Error signing in:', error)
        throw error
    }
}

const signUp = async (body) => {
    return await axiosClient.post('/user/register', body)
}

const oAuthSignIn = async (loginType) => {
    try {
        const response = await axiosClient.post('/user/oauth/social-login', {
            params: {
                loginType: loginType
            }
        })
        if (response.data && response.data.success) {
            console.log('OAuth sign in response:', response.data.data)
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to sign in with OAuth')
        }
    } catch (error) {
        console.error('Error signing in with OAuth:', error)
        throw error
    }
}

const googleSignInCallback = async (code) => {
    try {
        const response = await axiosClient.get('/auth/google/callback', {
            params: {
                code: code
            }
        })
        if (response.data && response.data.success) {
            // console.log('Google sign in response:', response.data.data)
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to sign in with Google')
        }
    } catch (error) {
        console.error('Error signing in with Google:', error)
        throw error
    }
} 

const getUserInfo = async () => {
    try {
        const response = await axiosClient.get('/user/me')
        if (response.data && response.data.success) {
            // console.log('User info:', response.data.data)
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch user info')
        }
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
    }
}

const introspectToken = async (token) => {
    return await axiosClient.post('/user/introspect', { token })
}

export { signIn, oAuthSignIn, signUp, getUserInfo, introspectToken, googleSignInCallback }
