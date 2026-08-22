import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateItineraryDto {
  @IsObject()
  content!: Record<string, unknown>;
}

export class ReplanDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  dayIndex?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  activityIndex?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class ToggleShareDto {
  @IsBoolean()
  enabled!: boolean;
}

export class CreateExpenseDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  category!: string;

  @IsInt()
  @Min(0)
  @Max(2_000_000_000)
  amount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  paidBy?: string;

  @IsOptional()
  @IsDateString()
  spentAt?: string;
}

export class CreatePackingItemDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  quantity?: number;
}

export class UpdatePackingItemDto {
  @IsOptional()
  @IsBoolean()
  isPacked?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  quantity?: number;
}

export class CreateCollaboratorDto {
  @IsEmail()
  email!: string;

  @IsIn(['VIEWER', 'EDITOR'])
  role!: 'VIEWER' | 'EDITOR';
}

export class CreateJournalEntryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  title!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5000)
  content!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  imageUrl?: string;

  @IsOptional()
  @IsDateString()
  entryDate?: string;
}

export class CreateBookingDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  type!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(160)
  provider!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  confirmation?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_000_000_000)
  amount?: number;

  @IsOptional()
  @IsIn(['PLANNED', 'BOOKED', 'CANCELLED'])
  status?: 'PLANNED' | 'BOOKED' | 'CANCELLED';
}

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  @MaxLength(160)
  confirmation?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_000_000_000)
  amount?: number;

  @IsOptional()
  @IsIn(['PLANNED', 'BOOKED', 'CANCELLED'])
  status?: 'PLANNED' | 'BOOKED' | 'CANCELLED';
}
