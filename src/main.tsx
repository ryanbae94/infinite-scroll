import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
	if (import.meta.env.VITE_API_MOCKING !== 'enable') {
		return;
	}
	const { worker } = await import('./mocks/browser.ts');
	return worker.start();
}
enableMocking().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		// <React.StrictMode>
		<App />
		// </React.StrictMode>
	);
});
