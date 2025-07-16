export default function Dashboard({ user }) {
    return (
        <div className="container mt-5">
            <h2>سلام، {user.name}</h2>
            <p>خوش آمدی به داشبورد!</p>
        </div>
    );
}
