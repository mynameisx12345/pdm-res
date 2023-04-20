import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
@Injectable({
  providedIn: 'any'
})
export class SharedUtility {
  isMobile = this.deviceDetector.isMobile();
  isDesktop = this.deviceDetector.isDesktop();
  constructor(
    private deviceDetector: DeviceDetectorService
  ){}
}