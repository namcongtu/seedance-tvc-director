# Stickman Train Chase V2 — pilot chuyển động 6 giây

Mở `index.html` trực tiếp. Nếu chính sách trình duyệt chặn file://, chạy từ thư mục này:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Truy cập máy chủ cục bộ cổng 8766. Play / Pause / Restart / thanh tua. Không phụ thuộc mạng, thư viện trình duyệt hoặc API. Video xuất sẵn: `pilot.mp4`; bảng key pose: `contact-sheet.png`; ảnh riêng trong `poses/`.

## Vì sao thay rig v1

- v1 đặt khuỷu, gối, bàn tay/chân bằng tọa độ rời; chiều dài chi biến thiên ngoài kiểm soát.
- Root thường đứng tại chỗ trong khi chân lặp sin/cos; không có pha trụ theo mặt mái tàu.
- Chuyển run/jump/slip là thay cả bộ tọa độ ngay trong một frame; không nén trước bật hoặc sau đáp.
- Quỹ đạo ngang eased và quỹ đạo dọc sin không nối vận tốc với chạy/đáp. Reset tọa độ tại ranh giới shot che vấn đề liên tục.

## Rig và chuyển động mới

Tọa độ thế giới cố định theo tàu. Khe thật nằm ở x=700…870. Đỏ bật t=1,70, đáp 2,80; Xanh bật 2,45, đáp 3,55. Root chạy trên đường Hermite có tiếp tuyến vận tốc khai báo; bay theo parabol cao 128 px. Không cắt cảnh hoặc teleport root.

Cấu trúc: hông → thân → cổ/đầu; vai → khuỷu → tay; hông → gối → cổ chân. Đùi/cẳng chân dài 46 px mỗi đoạn, giải IK có hướng gối cố định. Khi trụ, điểm chân giữ tọa độ mái tàu; khi vung, nội suy qua cung nâng chân. Hông được hạ nếu mục tiêu chạm đất vượt tầm với. Vòng chạy có key contact/compression/passing/recoil; không dùng sin/cos để phát động toàn bộ chi. Sin/cos vẫn dùng hợp lý cho phép quay khớp, hình học IK và cung bước.

Các keyframe thân/tay có ease, nghiêng thân, kéo tay lấy đà, thu chân khi bay, vươn chân trước đáp, nén hông 23 px sau tiếp xúc rồi recoil. Squash/stretch thân giới hạn khoảng ±4,5%, không scale toàn bộ nhân vật. Đỏ có bước sửa và tay vung lấy thăng bằng. Blend ngắn ở các đoạn trở lại gait, thay cho đổi pose tức thì. Camera Hermite tracking, parallax có nhiều lớp; speed lines nhẹ và vòng impact không thay thế chuyển động nhân vật.

## Render và kiểm tra

Cần Node.js + Playwright + Chromium + FFmpeg đã cài để dùng các script phụ trợ (không cần để xem HTML):

```sh
node verify.cjs
node render.cjs
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames,duration -of json pilot.mp4
```

`CHROMIUM_PATH` và `DEMO_URL` có thể cấu hình. `render.cjs` chụp 144 frame tại t=n/24; mỗi frame giữ 1/24 giây, tổng đúng 6 giây. MP4 im lặng. Xem `REVIEW.md` để biết bằng chứng và giới hạn, không coi kiểm tra số học là chứng nhận chất lượng diễn xuất.
