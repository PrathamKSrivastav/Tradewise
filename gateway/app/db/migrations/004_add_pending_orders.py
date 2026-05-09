# gateway/app/db/migrations/004_add_pending_orders.py
from sqlalchemy import BigInteger, Column, Float, ForeignKey, Integer, String
from alembic import op

def upgrade():
    op.create_table(
        "pending_orders",
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        Column("symbol", String(20), nullable=False, index=True),
        Column("side", String(4), nullable=False),
        Column("order_type", String(10), nullable=False),
        Column("quantity", Integer, nullable=False),
        Column("target_price", Float, nullable=False),
        Column("status", String(10), nullable=False, server_default="pending"),
        Column("timestamp", BigInteger, nullable=False, index=True),
    )

def downgrade():
    op.drop_table("pending_orders")
