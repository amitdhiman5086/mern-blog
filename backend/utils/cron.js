import { CronJob } from 'cron';

const url = 'https://zoo-blog.onrender.com';

export function createKeepAliveJob() {
    const job = new CronJob('*/10 * * * *', async () => {
        try {
            console.log('Hitting the URL:', url);
            const response = await fetch(url);
            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            console.error('Error hitting the URL:', error.message);
        }
    });

    console.log('Cron job created to hit the URL every 10 minutes (not started yet).');
    return job;
}
