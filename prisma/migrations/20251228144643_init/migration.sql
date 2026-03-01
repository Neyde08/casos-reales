-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "mainImageUrl" TEXT,
    "gallery" TEXT,
    "tags" TEXT,
    "content" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Victim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "aliases" TEXT,
    "birthDate" DATETIME,
    "birthPlace" TEXT,
    "parents" TEXT,
    "familyInfo" TEXT,
    "education" TEXT,
    "occupation" TEXT,
    "ageAtDeathOrMissing" INTEGER,
    "lastSeenDate" DATETIME,
    "lastSeenPlace" TEXT,
    "deathDate" DATETIME,
    "causeOfDeath" TEXT,
    "biography" TEXT,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "Victim_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TimelineEvent_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suspect" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "aliases" TEXT,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "method" TEXT,
    "pattern" TEXT,
    "evidenceAgainst" TEXT,
    "convictionDetails" TEXT,
    "sentence" TEXT,
    "imageUrl" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Suspect_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "credibilityScore" INTEGER,
    "imageUrl" TEXT,
    CONSTRAINT "Evidence_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "publisher" TEXT,
    "date" DATETIME,
    "reliabilityTag" TEXT,
    CONSTRAINT "Source_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Case_slug_key" ON "Case"("slug");

-- CreateIndex
CREATE INDEX "Case_status_idx" ON "Case"("status");

-- CreateIndex
CREATE INDEX "Case_type_idx" ON "Case"("type");

-- CreateIndex
CREATE INDEX "Case_year_idx" ON "Case"("year");

-- CreateIndex
CREATE INDEX "Case_country_idx" ON "Case"("country");

-- CreateIndex
CREATE INDEX "Case_featured_idx" ON "Case"("featured");

-- CreateIndex
CREATE INDEX "Victim_caseId_idx" ON "Victim"("caseId");

-- CreateIndex
CREATE INDEX "Victim_fullName_idx" ON "Victim"("fullName");

-- CreateIndex
CREATE INDEX "TimelineEvent_caseId_idx" ON "TimelineEvent"("caseId");

-- CreateIndex
CREATE INDEX "TimelineEvent_date_idx" ON "TimelineEvent"("date");

-- CreateIndex
CREATE INDEX "Suspect_caseId_idx" ON "Suspect"("caseId");

-- CreateIndex
CREATE INDEX "Evidence_caseId_idx" ON "Evidence"("caseId");

-- CreateIndex
CREATE INDEX "Source_caseId_idx" ON "Source"("caseId");
