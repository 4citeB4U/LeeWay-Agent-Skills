using System;
using System.Runtime.InteropServices;

public static class LeeWayStopShortcut
{
    public const int Id = 0x4C57;
    [StructLayout(LayoutKind.Sequential)]
    private struct Point { public int X; public int Y; }
    [StructLayout(LayoutKind.Sequential)]
    private struct Message {
        public IntPtr Hwnd;
        public uint Value;
        public UIntPtr WParam;
        public IntPtr LParam;
        public uint Time;
        public Point Position;
        public uint Private;
    }
    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool RegisterHotKey(IntPtr window, int id, uint modifiers, uint key);
    [DllImport("user32.dll")]
    private static extern bool UnregisterHotKey(IntPtr window, int id);
    [DllImport("user32.dll")]
    private static extern bool PeekMessage(out Message message, IntPtr window, uint min, uint max, uint remove);
    public static bool Register() {
        // Control + Alt + S, with repeat suppression. Only held during playback.
        return RegisterHotKey(IntPtr.Zero, Id, 0x4003, 0x53);
    }
    public static bool Requested() {
        Message message;
        while (PeekMessage(out message, IntPtr.Zero, 0x0312, 0x0312, 1)) {
            if (message.WParam.ToUInt64() == Id) return true;
        }
        return false;
    }
    public static void Release() { UnregisterHotKey(IntPtr.Zero, Id); }
}
