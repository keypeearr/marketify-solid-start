export default function Navbar() {
    return (
        <div class="navbar bg-base-100 shadow-sm flex-initial">
            <div class="navbar-start">
                <a href="/" class="btn btn-ghost text-xl">Marketify</a>
            </div>
            <div class="navbar-end">
                <ul class="menu menu-horizontal px-1">
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </div>
        </div>
    )
}
