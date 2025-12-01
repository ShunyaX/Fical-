export default function Pulse() {
  return (
    <div className="flex items-center justify-center w-full h-40">
      <div className="flex space-x-3">
        
        <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce" />
        
        <span
          className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />

        <span
          className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.10s" }}
        />

      </div>
    </div>

  );
}
