
import React, { useState, useRef, useEffect } from 'react';
import {
    FaPaperPlane, FaUser, FaRobot, FaTrash, FaMicrophone,
    FaSearch, FaEllipsisV, FaRegCommentDots, FaRegUserCircle,
    FaRegClock, FaRegStar, FaRegEdit, FaBars
} from 'react-icons/fa';
import { BsThreeDotsVertical, BsStopFill } from 'react-icons/bs';
import useAuthStore from "../../store/authStore.js";
import {logoutUser} from "../../api/auth.js";
import {useNavigate} from "react-router-dom";
import UserProfileModal from "./UserProfileModal.jsx";

export default function ChatBox(){
    // State مدیریت چت فعال
    const [activeChat, setActiveChat] = useState(1);
    const { user } = useAuthStore();
    console.log(user);


    // State برای پیام‌ها
    const [messages, setMessages] = useState({
        1: [
            { id: 1, text: 'سلام! چطور می‌تونم کمکتون کنم؟', sender: 'bot', timestamp: '10:30' },
            { id: 2, text: 'سلام! می‌خوام یک صفحه لاگین طراحی کنم', sender: 'user', timestamp: '10:31' },
            { id: 3, text: 'حتماً! دوست داری با چه فناوری‌هایی کار کنی؟ React و Tailwind CSS خوبه؟', sender: 'bot', timestamp: '10:31' },
        ],
        2: [
            { id: 1, text: 'در مورد طراحی UI کمکتون می‌کنم', sender: 'bot', timestamp: '09:15' },
        ],
        3: [
            { id: 1, text: 'برای پروژه جدید آماده کمک هستم', sender: 'bot', timestamp: 'دیروز' },
        ]
    });

    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    // لیست مکالمات
    const conversations = [
        {
            id: 1,
            name: 'پشتیبانی فنی',
            lastMessage: 'دوست داری با چه فناوری‌هایی کار کنی؟',
            time: '10:31',
            unread: 0,
            icon: <FaRobot className="text-indigo-500" />
        },
        {
            id: 2,
            name: 'تیم طراحی',
            lastMessage: 'منتظر پیشنهادات شما هستیم',
            time: '09:20',
            unread: 3,
            icon: <FaRegCommentDots className="text-purple-500" />
        },
        {
            id: 3,
            name: 'پروژه جدید',
            lastMessage: 'آماده شروع کار هستید؟',
            time: 'دیروز',
            unread: 0,
            icon: <FaRegUserCircle className="text-green-500" />
        }
    ];

    // اسکرول به آخرین پیام
    useEffect(() => {
        scrollToBottom();
    }, [messages[activeChat]]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newMessage = {
            id: messages[activeChat].length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages({
            ...messages,
            [activeChat]: [...messages[activeChat], newMessage]
        });

        setInputValue('');

        // شبیه‌سازی پاسخ ربات
        setTimeout(() => {
            const botResponse = {
                id: messages[activeChat].length + 2,
                text: 'پیام شما دریافت شد. در حال پردازش درخواست...',
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages({
                ...messages,
                [activeChat]: [...messages[activeChat], newMessage, botResponse]
            });
        }, 1000);
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
    };

    const clearChat = () => {
        setMessages({
            ...messages,
            [activeChat]: [messages[activeChat][0]]
        });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    ///////

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();  // تماس با بک‌اند برای حذف توکن
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            logout();
            navigate('/login');
        }
    };
    return(

        <div className="flex h-screen max-h-screen bg-gray-50">
            {/**/}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
                خروج از حساب
            </button>
            {/**/}
            {/**/}
            <UserProfileModal />
            {/**/}
            <h1>سلام، {user?.name}</h1>
            {/* پنل کناری - لیست مکالمات */}
            {sidebarOpen && (
                <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
                    {/* هدر پنل کناری */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">مکالمات</h2>
                            <div className="flex space-x-2">
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <FaRegEdit />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <BsThreeDotsVertical />
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="جستجو در مکالمات..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* بدنه لیست مکالمات */}
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(conversation => (
                            <div
                                key={conversation.id}
                                onClick={() => setActiveChat(conversation.id)}
                                className={`p-4 border-b border-gray-200 flex items-center cursor-pointer transition ${
                                    activeChat === conversation.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    {conversation.icon}
                                </div>

                                <div className="flex-1 min-w-0 ml-3">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                      <FaRegClock className="inline mr-1" />
                                            {conversation.time}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                                        {conversation.unread > 0 && (
                                            <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* فوتر پنل کناری */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-4">
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                                <FaRegStar className="text-gray-700" />
                            </button>
                            <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                                <FaRegEdit />
                            </button>
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                                <FaRegUserCircle className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* بخش اصلی چت */}
            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-3/4' : 'w-full'}`}>
                {/* هدر چت */}
                <div className="bg-white p-4 border-b border-gray-200 flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 mr-3 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        <FaBars className="text-gray-700" />
                    </button>

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaRobot className="text-indigo-600" />
                        </div>
                        <div className="ml-3">
                            <h2 className="font-bold text-gray-800">
                                {conversations.find(c => c.id === activeChat)?.name}
                            </h2>
                            <p className="text-xs text-gray-500">آنلاین</p>
                        </div>
                    </div>

                    <div className="ml-auto flex space-x-2">
                        <button
                            onClick={clearChat}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="پاک کردن چت"
                        >
                            <FaTrash className="text-gray-700" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100">
                            <BsThreeDotsVertical className="text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* بدنه مکالمه */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-white to-indigo-50">
                    {messages[activeChat].map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] flex ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                {message.sender === 'bot' && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                        <FaRobot className="text-indigo-600" />
                                    </div>
                                )}

                                <div className={`rounded-2xl px-4 py-3 ${
                                    message.sender === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                                }`}>
                                    <p className="text-base">{message.text}</p>
                                    <div className={`text-xs mt-1 ${
                                        message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                                    }`}>
                                        {message.timestamp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* بخش ارسال پیام */}
                <div className="bg-white p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="پیام خود را بنویسید..."
                                className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                            <button
                                type="button"
                                onClick={toggleRecording}
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    isRecording ? 'text-red-500' : 'text-gray-500'
                                }`}
                            >
                                {isRecording ? <BsStopFill className="animate-pulse" /> : <FaMicrophone />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={inputValue.trim() === ''}
                            className={`p-4 rounded-full ${
                                inputValue.trim() === ''
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800'
                            } transition-all shadow-md`}
                        >
                            <FaPaperPlane />
                        </button>
                    </form>

                    <div className="text-center mt-3 text-xs text-gray-500">
                        <p>دستیار هوشمند ممکن است پاسخ‌های نادرست بدهد. اطلاعات حساس را وارد نکنید.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}