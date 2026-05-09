import httpx
import asyncio

async def check():
    async with httpx.AsyncClient() as client:
        try:
            # 1. Login
            resp = await client.post(
                "http://localhost:8000/auth/login",
                json={"email": "trader01@tradewise.com", "password": "test1234"}
            )
            if resp.status_code != 200:
                print(f"Login failed: {resp.status_code} {resp.text}")
                return
            
            token = resp.json()["access_token"]
            print("Login successful")

            # 2. Fetch Pending
            resp = await client.get(
                "http://localhost:8000/trade/pending",
                headers={"Authorization": f"Bearer {token}"}
            )
            print(f"Pending status: {resp.status_code}")
            if resp.status_code == 200:
                print(f"Pending count: {len(resp.json())}")
            else:
                print(f"Pending failed: {resp.text}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(check())
