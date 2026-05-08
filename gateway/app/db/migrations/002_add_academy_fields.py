# gateway/app/db/migrations/002_add_academy_fields.py
# revision: 002
# down_revision: 001
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import ARRAY


def upgrade() -> None:
    # Academy columns on users table
    op.add_column("users", sa.Column("current_level", sa.Integer(), nullable=False, server_default="1"))
    op.add_column("users", sa.Column("total_xp", sa.Integer(), nullable=False, server_default="0"))
    op.add_column("users", sa.Column("completed_lessons", ARRAY(sa.String()), nullable=False, server_default="{}"))
    op.add_column("users", sa.Column("current_streak", sa.Integer(), nullable=False, server_default="0"))
    op.add_column("users", sa.Column("longest_streak", sa.Integer(), nullable=False, server_default="0"))
    op.add_column("users", sa.Column("last_active_date", sa.Date(), nullable=True))
    op.add_column("users", sa.Column("streak_multiplier", sa.Numeric(3, 2), nullable=False, server_default="1.00"))
    op.add_column("users", sa.Column("badges", ARRAY(sa.String()), nullable=False, server_default="{}"))
    op.add_column("users", sa.Column("unlocked_levels", ARRAY(sa.Integer()), nullable=False, server_default="{1}"))

    # New quiz_history table
    op.create_table(
        "quiz_history",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("lesson_id", sa.String(100), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("attempts", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("last_attempt_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_quiz_history_user_id", "quiz_history", ["user_id"])
    op.create_index("ix_quiz_history_lesson_id", "quiz_history", ["lesson_id"])


def downgrade() -> None:
    op.drop_table("quiz_history")
    op.drop_column("users", "unlocked_levels")
    op.drop_column("users", "badges")
    op.drop_column("users", "streak_multiplier")
    op.drop_column("users", "last_active_date")
    op.drop_column("users", "longest_streak")
    op.drop_column("users", "current_streak")
    op.drop_column("users", "completed_lessons")
    op.drop_column("users", "total_xp")
    op.drop_column("users", "current_level")
