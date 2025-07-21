import Logi from "../../assest/imgaes/logo2.png";

export default function ChatBoxPage() {
    return (

        <div className="min-h-screen flex bg-gray-900 text-white">

            <div className="w-[25%] bg-gray-800 flex flex-col justify-between p-4">
                <div>
                    <div className="flex justify-center mb-6">
                        <img
                            className="h-12 w-auto"
                            src={Logi}
                            alt="logo"
                        />
                    </div>


                    <div className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl text-center cursor-pointer mb-4">
                        + New Chat
                    </div>


                    <div className="space-y-2">
                        <div className="bg-gray-700 p-3 rounded-xl flex justify-between items-center hover:bg-gray-600">
                            <span className="truncate">Chat 1</span>
                            <a href="#" className="text-red-400 text-sm hover:text-red-600">delete</a>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-xl flex justify-between items-center hover:bg-gray-600">
                            <span className="truncate">Chat 2</span>
                            <a href="#" className="text-red-400 text-sm hover:text-red-600">delete</a>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-xl flex justify-between items-center hover:bg-gray-600">
                            <span className="truncate">Chat 3</span>
                            <a href="#" className="text-red-400 text-sm hover:text-red-600">delete</a>
                        </div>
                    </div>
                </div>


                <div className="text-center text-2xl text-gray-400 mt-6">
                    User: <span className="font-medium text-white">Name</span>
                </div>
            </div>


            <div className="w-[70%] flex flex-col justify-between p-6 bg-gray-900">
                <div className="flex-1 overflow-y-auto space-y-4">

                    <div className="flex">
                        <div className="max-w-[70%] bg-gray-700 text-white p-3 rounded-xl rounded-tl-none">
                            سلام! چطور می‌تونم کمکت کنم؟
                        </div>
                    </div>


                    <div className="flex justify-end">
                        <div className="max-w-[70%] bg-blue-600 text-white p-3 rounded-xl rounded-tr-none">
                            سلام، یه سوال دارم درباره پروژه‌م...
                        </div>
                    </div>

                    <div className="flex">
                        <div className="max-w-[70%] bg-gray-700 text-white p-3 rounded-xl rounded-tl-none">
                            حتماً، لطفاً سوالتو بپرس
                        </div>
                    </div>
                </div>

                {/* Input */}
                <form className="mt-6">
                    <div className="relative w-full max-w-3xl mx-auto">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full py-3 px-4 pr-24 rounded-xl bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )
}