// function for make date as (Today, Yesterday, 11 March 2023 )
export const getDate = (date) =>
{
    // Create Date objects for comparison
    date = new Date(date);
    const today = new Date();

    // Extract date components for comparison
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    // Check for "Today" directly based on date components
    if (
        dateYear === todayYear &&
        dateMonth === todayMonth &&
        dateDay === todayDay)
    {
        return "Today";
    }
    // Check for "Yesterday" directly based on date components
    else if (
        dateYear === todayYear &&
        dateMonth === todayMonth &&
        dateDay === (todayDay - 1))
    {
        return "Yesterday";
    }
    // Check for Day of the week for within current week
    else if (
        dateYear === todayYear &&
        dateMonth === todayMonth &&
        dateDay <= (todayDay - 2) &&
        dateDay > (todayDay - 7))
    {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    // More than a week ago case
    else
    {
        return date.getDate() + " " +
            date.toLocaleString('en-US', { month: 'long' }) + " " +
            date.getFullYear();
    }
};