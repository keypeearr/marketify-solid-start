import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Navbar from "~/components/Navbar";
import { SignupSchema, signupSchema } from "~/lib/schemas/schemas";
import { Error } from "~/lib/types/interfaces";

export default function Signup() {
    const [inputs, setInputs] = createStore<SignupSchema>({
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = createSignal<Error>({ status: 0, message: "" })

    const handleChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
        const { name, value } = e.currentTarget

        setInputs(name as keyof SignupSchema, value)
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()

        const result = signupSchema.safeParse(inputs)

        if (!result.success) {
            const firstError = result.error.errors[0]
            setError({ status: 400, message: firstError.message })
            setError({ status: 400, message: firstError.message })
            return
        }
    }

    return (
        <>
            <Navbar />
            <main class="flex-1 flex flex-row justify-center items-center">
                <div class="card w-96 items-center bg-base-200 border rounded-box border-base-300 shadow-bg-300 shadow-sm">
                    <div class="card-body">
                        <div class="card-title">Marketify Sign Up</div>
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

                                <label class="label">Confirm Password</label>
                                <input
                                    class="input"
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    value={inputs.confirmPassword}
                                    placeholder="Confirm password"
                                    onInput={handleChange}
                                />

                                <Show when={error().status !== 0 && error().message !== ""}>
                                    <div role="alert" class="alert alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{error().message}</span>
                                    </div>
                                </Show>

                                <a class="link link-hover" href="/login">Already have an account? Login</a>
                                <button class="btn btn-neutral" type="submit">Sign Up</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
