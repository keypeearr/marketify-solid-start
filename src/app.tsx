import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import AuthProvider from "./context/auth";
import "./app.css";

export default function App() {
    return (
        <AuthProvider>
            <Router
                root={props => (
                    <MetaProvider>
                        <Title>Marketify</Title>
                        <Suspense>{props.children}</Suspense>
                    </MetaProvider>
                )}
            >
                <FileRoutes />
            </Router>
        </AuthProvider>
    );
}
