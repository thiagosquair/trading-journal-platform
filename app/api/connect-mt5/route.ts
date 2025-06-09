export async function connectTradingAccount({ name, server, login, password }: any) {
  const response = await fetch('/api/connect-mt5', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, server, login, password }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to connect MT5 account');
  }

  return result;
}
