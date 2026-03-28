import Navbar from "~/components/Navbar";
import { useAuth } from "~/context/auth";
import { createStore } from "solid-js/store";
import { LoginSchema } from "~/lib/schemas/schemas";

export default function Login() {
    const auth = useAuth()
    const [inputs, setInputs] = createStore<LoginSchema>({ username: "", password: "" })

    const handleChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
        const { name, value } = e.currentTarget

        setInputs(name as keyof LoginSchema, value)
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        await auth.login(inputs.username, inputs.password)
    }

    return (
        <>
            <Navbar />
            <main class="flex-1 flex flex-row justify-center items-center">
                <div class="card w-96 items-center bg-base-200 border rounded-box border-base-300 shadow-bg-300 shadow-sm">
                    <div class="card-body">
                        <div class="card-title">Marketify Login</div>
                        <form onSubmit={handleSubmit}>
                            <fieldset class="fieldset">
                                <label class="label">Username</label>
                                <input
                                    class="input"
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={inputs.username}
                                    placeholder="Enter username"
                                    onInput={handleChange}
                                />

                                <label class="label">Password</label>
                                <input
                                    class="input"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={inputs.password}
                                    placeholder="Enter password"
                                    onInput={handleChange}
                                />

                                <a class="link link-hover" href="/forgot-password">Forgot password?</a>
                                <button class="btn btn-neutral" type="submit">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
