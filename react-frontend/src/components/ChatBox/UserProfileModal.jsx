import { useEffect, useState } from "react";
import { getUser, updateUser, deleteUser } from "../../api/auth";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function UserProfileModal() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editing, setEditing] = useState(false);

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await getUser();
            setUser(res.data);
            setForm({ name: res.data.name, email: res.data.email, password: "" });
        } catch (error) {
            console.error("خطا در دریافت اطلاعات کاربر", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await updateUser(form);
            setEditing(false);
            alert("اطلاعات با موفقیت ذخیره شد");
        } catch (error) {
            alert("خطا در ذخیره اطلاعات");
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm("آیا از حذف حساب کاربری مطمئن هستید؟");
        if (!confirmed) return;

        try {
            await deleteUser();
            logout();
            navigate("/register");
        } catch (error) {
            alert("خطا در حذف حساب کاربری");
        }
    };

    if (!user) return <div>در حال بارگذاری...</div>;

    return (
        <div className="border p-4 rounded-md bg-gray-50 text-sm space-y-3 max-w-sm mx-auto">
            {editing ? (
                <EditForm form={form} onChange={handleChange} onCancel={() => setEditing(false)} onSubmit={handleUpdate} />
            ) : (
                <ProfileView user={user} onEdit={() => setEditing(true)} />
            )}

            <hr />
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded w-full">
                حذف حساب کاربری
            </button>
        </div>
    );
}

function ProfileView({ user, onEdit }) {
    return (
        <>
            <div>👤 {user.name}</div>
            <div>📧 {user.email}</div>
            <button onClick={onEdit} className="bg-blue-500 text-white px-3 py-1 rounded">
                ویرایش
            </button>
        </>
    );
}

function EditForm({ form, onChange, onCancel, onSubmit }) {
    return (
        <>
            <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="border p-1 w-full rounded"
                placeholder="نام"
            />
            <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="border p-1 w-full rounded"
                placeholder="ایمیل"
            />
            <input
                name="password"
                value={form.password}
                onChange={onChange}
                className="border p-1 w-full rounded"
                placeholder="رمز جدید"
                type="password"
            />
            <div className="flex gap-2">
                <button onClick={onSubmit} className="bg-green-600 text-white px-3 py-1 rounded">
                    ذخیره
                </button>
                <button onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">
                    انصراف
                </button>
            </div>
        </>
    );
}
