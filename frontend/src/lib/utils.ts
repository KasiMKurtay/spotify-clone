import { clsx, type ClassValue } from "clsx"; // clsx fonksiyonunu ve ClassValue türünü import eder. clsx, birden fazla sınıf ismini birleştirmeye yarar.
import { twMerge } from "tailwind-merge"; // tailwind-merge fonksiyonunu import eder. Bu fonksiyon, çakışan Tailwind CSS sınıflarını birleştirir.

export function cn(...inputs: ClassValue[]) { // cn fonksiyonu, birden fazla sınıf adı alır ve bunları birleştirir.
  return twMerge(clsx(inputs)); // clsx ile gelen sınıf adlarını birleştirir ve tailwind-merge ile çakışan sınıfları düzgün bir şekilde birleştirir.
}
