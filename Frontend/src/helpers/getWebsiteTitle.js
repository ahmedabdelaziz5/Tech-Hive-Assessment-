const titleMap = {
    "/login": "Login",
    "/signup": "Signup",
    "/signup/resend-email": "Signup - Resend Email",
    "/forgot-password": "Forgot Password",
    "/reset-password": "Reset Password",
    "/": "Tasks",
    "/profile": "Profile",
    "/tasks": "Tasks",
    "/todo": "Tasks",
    "/inprogress": "Tasks",
    "/done": "Tasks",
    "/calender": "Tasks Calender",

};
export const getWebsiteTitle = (pathname) =>
{
    if (pathname.includes("calender")) return titleMap["/tasks/calender"]
    else if (pathname.includes("reset-password")) return titleMap["/reset-password"]
    return titleMap[pathname] || null;
}