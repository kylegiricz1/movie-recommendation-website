from typing import Optional
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import BigInteger
from sqlalchemy import Float
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from db import Base

class Movies(Base):
    __tablename__ = "movies"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    budget: Mapped[int] = mapped_column(BigInteger)
    genres: Mapped[str] = mapped_column(Text)
    homepage: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    keywords: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    original_language: Mapped[str] = mapped_column(String)
    original_title: Mapped[str] = mapped_column(String)
    overview: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    popularity: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    production_companies: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    production_countries: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    release_date: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    revenue: Mapped[Optional[int]] = mapped_column(BigInteger, nullable=True)
    runtime: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    spoken_languages: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    tagline: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    vote_average: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_count: Mapped[Optional[int]] = mapped_column(BigInteger, nullable=True)
