import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AiChatBox from "../components/AiChatBox";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      {/* Hilangkan h-screen dan overflow-hidden agar halaman bisa scroll */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <Topbar />
        </div>

        {/* Berikan padding yang cukup dan biarkan tinggi menyesuaikan konten */}
        <div className="flex-1 p-8 flex flex-col items-center">
          <div className="w-full max-w-4xl flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">AI Assistant Workspace</h1>
              <p className="text-gray-400">Interact with your data through natural language</p>
            </div>
            
            {/* Hapus h-full agar box memanjang mengikuti isi chat */}
            <div className="shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-100">
               <AiChatBox fullScreen={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
