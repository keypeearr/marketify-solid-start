import { createContext, createSignal, useContext } from "solid-js";

interface User {
    username: string
}

interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: () => { },
})

export default function AuthProvider(props: { children: any }) {
    const [user, setUser] = createSignal<User | null>(null)

    const login = async (username: string, password: string) => {
        if (username === "kyle" && password === "requez") {
            console.log("DSKFSDJ")
        }

        setUser({ username: "Kyle Requez" })
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user: user(), login, logout }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => useContext(AuthContext)
