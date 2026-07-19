import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private static instanceCounter = 0;
  public readonly instanceId: number;
  private notifications: string[] = [];

  constructor() {
    NotificationService.instanceCounter++;
    this.instanceId = NotificationService.instanceCounter;
    console.log(`NotificationService instance #${this.instanceId} created.`);
  }

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clear(): void {
    this.notifications = [];
  }
}
