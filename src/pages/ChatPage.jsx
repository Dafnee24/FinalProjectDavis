import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AiChatBox from "../components/AiChatBox";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen bg-[#ecfdf5]">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white px-6 py-4 shadow-sm">
          <Topbar />
        </div>

        <div className="p-8">
          <AiChatBox />
        </div>
      </div>
    </div>
  );
}
