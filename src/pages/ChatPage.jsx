import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AiChatBox from "../components/AiChatBox";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <Topbar />
        </div>

        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl h-full flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">AI Assistant Workspace</h1>
              <p className="text-gray-400">Interact with your data through natural language</p>
            </div>
            
            <div className="flex-1 shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-100">
               <AiChatBox fullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

