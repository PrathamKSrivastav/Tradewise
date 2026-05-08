# gateway/app/db/migrations/003_add_exam_and_certificate.py
# revision: 003
# down_revision: 002
from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.create_table(
        "exam_attempts",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("correct_count", sa.Integer(), nullable=False),
        sa.Column("total_questions", sa.Integer(), nullable=False),
        sa.Column("passed", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("attempted_at", sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        "certificates",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("issued_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("certificate_url", sa.String(500), nullable=False),
    )

    # Add certificate_url column to users for quick lookup
    op.add_column("users", sa.Column("certificate_url", sa.String(500), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "certificate_url")
    op.drop_table("certificates")
    op.drop_table("exam_attempts")
