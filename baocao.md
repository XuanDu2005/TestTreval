# BÁO CÁO TỐT NGHIỆP

## ĐỀ TÀI: XÂY DỰNG HỆ THỐNG TRAVELMIND — TRỢ LÝ LẬP KẾ HOẠCH DU LỊCH THÔNG MINH SỬ DỤNG TRÍ TUỆ NHÂN TẠO

---

**Sinh viên thực hiện:** [Họ và tên sinh viên] — MSSV: [MSSV]  
**Lớp:** [Lớp]  
**Khoa:** [Khoa]  
**Trường:** [Tên trường đại học]

**Giáo viên hướng dẫn:** [Học vị, họ và tên GVHD]

**Khóa:** [Năm học]  
**Địa điểm thực hiện:** [Địa điểm]

---

## LỜI CAM ĐOAN

Tôi xin cam đoan rằng toàn bộ nội dung của báo cáo tốt nghiệp này là kết quả nghiên cứu và thực hiện của riêng tôi dưới sự hướng dẫn của Giáo viên hướng dẫn. Mọi tài liệu tham khảo đều được trích dẫn rõ ràng. Báo cáo này chưa từng được nộp để nhận bất kỳ học vị nào tại bất kỳ cơ sở đào tạo nào khác.

&nbsp;

**Sinh viên**

[Họ và tên]

---

## LỜI CẢM ƠN

Tôi xin chân thành cảm ơn [GVHD] đã tận tình hướng dẫn, định hướng và đóng góp những ý kiến quý báu trong suốt quá trình thực hiện đề tài tốt nghiệp. Xin cảm ơn gia đình, bạn bè đã động viên và hỗ trợ tôi hoàn thành khóa luận này.

---

## MỤC LỤC

- [PHẦN MỞ ĐẦU](#phần-mở-đầu)
  - [Lý do chọn đề tài](#lý-do-chọn-đề-tài)
  - [Mục tiêu của đề tài](#mục-tiêu-của-đề-tài)
  - [Đối tượng và phạm vi nghiên cứu](#đối-tượng-và-phạm-vi-nghiên-cứu)
  - [Phương pháp nghiên cứu](#phương-pháp-nghiên-cứu)
  - [Ý nghĩa khoa học và thực tiễn](#ý-nghĩa-khoa-học-và-thực-tiễn)
  - [Cấu trúc của báo cáo](#cấu-trúc-của-báo-cáo)
- [CHƯƠNG 1: TỔNG QUAN VÀ KHẢO SÁT HỆ THỐNG](#chương-1-tổng-quan-và-khảo-sát-hệ-thống)
- [CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG](#chương-2-phân-tích-yêu-cầu-hệ-thống)
- [CHƯƠNG 3: THIẾT KẾ HỆ THỐNG](#chương-3-thiết-kế-hệ-thống)
- [CHƯƠNG 4: THIẾT KẾ CƠ SỞ DỮ LIỆU](#chương-4-thiết-kế-cơ-sở-dữ-liệu)
- [CHƯƠNG 5: THIẾT KẾ GIAO DIỆN VÀ TRIỂN KHAI](#chương-5-thiết-kế-giao-diện-và-triển-khai)
- [CHƯƠNG 6: KIỂM THỬ VÀ ĐÁNH GIÁ](#chương-6-kiểm-thử-và-đánh-giá)
- [CHƯƠNG 7: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN](#chương-7-kết-luận-và-hướng-phát-triển)
- [TÀI LIỆU THAM KHẢO](#tài-liệu-tham-khảo)
- [PHỤ LỤC](#phụ-lục)

---

## DANH MỤC HÌNH

> *Ghi chú: tất cả sơ đồ UML sử dụng cú pháp Mermaid — khi copy sang Word, nhấp chuột phải vào khối mã Mermaid → chọn render/preview hoặc dùng plugin "Mermaid Preview for Word" để chuyển thành hình ảnh.*

| STT | Mã hình | Tên hình |
|-----|---------|----------|
| 1   | H1.1    | Sơ đồ use case tổng quan |
| 2   | H1.2    | Biểu đồ phân rã chức năng |
| 3   | H3.1    | Sơ đồ kiến trúc tổng quan |
| 4   | H3.2    | Sơ đồ luồng request |
| 5   | H3.3    | Sơ đồ activity — Tạo chuyến đi bằng AI |
| 6   | H3.4    | Sơ đồ sequence — Đăng nhập |
| 7   | H3.5    | Sơ đồ sequence — Sinh lịch trình bằng AI |
| 8   | H3.6    | Sơ đồ sequence — Chat với trợ lý |
| 9   | H3.7    | Sơ đồ sequence — Admin quản lý Hero carousel |
| 10  | H3.8    | Sơ đồ component giao diện |
| 11  | H4.1    | Sơ đồ ERD |
| 12  | H4.2    | Sơ đồ logic — chuyển đổi ERD sang quan hệ |
| 13  | H5.1    | Trang chủ (public) |
| 14  | H5.2    | Trang đăng nhập |
| 15  | H5.3    | Trang đăng ký |
| 16  | H5.4    | Trang tạo chuyến đi |
| 17  | H5.5    | Trang chi tiết chuyến đi (lịch trình) |
| 18  | H5.6    | Trang chuyến đi của tôi |
| 19  | H5.7    | Trang khám phá (recommendations) |
| 20  | H5.8    | Trang chi tiết recommendation |
| 21  | H5.9    | Trang hồ sơ cá nhân |
| 22  | H5.10   | Admin — Dashboard |
| 23  | H5.11   | Admin — Quản lý người dùng |
| 24  | H5.12   | Admin — Quản lý recommendations |
| 25  | H5.13   | Admin — Form tạo/sửa recommendation |
| 26  | H5.14   | Admin — Quản lý chuyến đi |
| 27  | H5.15   | Admin — Analytics |
| 28  | H5.16   | Admin — Quản lý Hero carousel |

---

## DANH MỤC BẢNG

| STT | Mã bảng | Tên bảng |
|-----|---------|----------|
| 1   | B1.1    | Bảng so sánh các hệ thống lập kế hoạch du lịch hiện có |
| 2   | B2.1    | Bảng yêu cầu chức năng của hệ thống |
| 3   | B2.2    | Bảng yêu cầu phi chức năng |
| 4   | B2.3    | Bảng phân quyền theo vai trò |
| 5   | B3.1    | Bảng công nghệ sử dụng |
| 6   | B3.2    | Bảng API endpoint của hệ thống |
| 7   | B4.1    | Bảng mô tả bảng `users` |
| 8   | B4.2    | Bảng mô tả bảng `trips` |
| 9   | B4.3    | Bảng mô tả bảng `itineraries` |
| 10  | B4.4    | Bảng mô tả bảng `recommendations` |
| 11  | B4.5    | Bảng mô tả bảng `favorites` |
| 12  | B4.6    | Bảng mô tả bảng `chat_sessions` |
| 13  | B4.7    | Bảng mô tả bảng `chat_messages` |
| 14  | B4.8    | Bảng mô tả bảng `hero_slides` |
| 15  | B5.1    | Bảng các module NestJS |
| 16  | B5.2    | Bảng các trang giao diện chính |
| 17  | B6.1    | Bảng ca kiểm thử chức năng đăng nhập |
| 18  | B6.2    | Bảng ca kiểm thử chức năng tạo chuyến đi |
| 19  | B6.3    | Bảng ca kiểm thử chức năng chat với trợ lý |
| 20  | B6.4    | Bảng ca kiểm thử chức năng quản lý recommendation |

---

# PHẦN MỞ ĐẦU

## Lý do chọn đề tài

Ngành du lịch là một trong những ngành kinh tế quan trọng của Việt Nam và thế giới. Theo Tổng cục Du lịch Việt Nam, lượng khách nội địa năm 2024 đạt hơn 110 triệu lượt, trong đó phần lớn là du khách tự tổ chức ("tự túc" hoặc "free & easy"). Nhu cầu lên kế hoạch du lịch cá nhân hóa ngày càng tăng, đặc biệt ở giới trẻ và người đi làm với quỹ thời gian hạn chế.

Tuy nhiên, việc lên kế hoạch du lịch hiện nay vẫn gặp nhiều khó khăn:

- **Phân mảnh thông tin**: Du khách phải tra cứu điểm đến, thời tiết, di chuyển, ăn uống, lưu trú trên nhiều nguồn khác nhau.
- **Thiếu cá nhân hóa**: Hầu hết các bài viết blog/danh sách du lịch đều chung chung, không phù hợp với sở thích, ngân sách, thời gian cụ thể của từng người.
- **Khó cập nhật thời gian thực**: Thông tin về giá vé, giờ mở cửa, đóng cửa đường… thay đổi liên tục.
- **Không có công cụ hỗ trợ tổ chức lịch trình**: Người dùng thường phải tự ghi chép trên giấy, Excel hoặc các ứng dụng không chuyên.

Sự ra đời của các mô hình ngôn ngữ lớn (LLM) như **Google Gemini**, **OpenAI GPT** đã mở ra cơ hội mới: có thể tự động sinh lịch trình du lịch cá nhân hóa theo ngữ cảnh của từng người dùng với chi phí rất thấp.

Vì vậy, tôi chọn đề tài **"Xây dựng hệ thống TravelMind — Trợ lý lập kế hoạch du lịch thông minh sử dụng trí tuệ nhân tạo"** nhằm cung cấp một giải pháp tích hợp, cá nhân hóa, dễ sử dụng cho người Việt.

## Mục tiêu của đề tài

### Mục tiêu tổng quát

Xây dựng một hệ thống web cho phép người dùng tạo, lưu trữ và quản lý các chuyến đi du lịch với lịch trình chi tiết từng ngày, được sinh tự động bởi trí tuệ nhân tạo dựa trên điểm đến, thời gian, ngân sách và sở thích cá nhân.

### Mục tiêu cụ thể

1. **Về hệ thống Backend**: Xây dựng REST API bằng NestJS + Prisma + PostgreSQL với đầy đủ các nghiệp vụ: đăng ký, đăng nhập, quản lý chuyến đi, sinh lịch trình AI, quản lý gợi ý du lịch, quản lý yêu thích, chat với trợ lý, dashboard quản trị.

2. **Về hệ thống Frontend**: Xây dựng giao diện web responsive, hỗ trợ hai ngôn ngữ Việt – Anh, dark/light mode, với đầy đủ các trang người dùng cuối và trang quản trị.

3. **Về tích hợp AI**: Tích hợp nhà cung cấp AI có khả năng swap-in (Gemini / OpenAI / Ollama / Mock) để sinh lịch trình có cấu trúc JSON.

4. **Về triển khai**: Đóng gói toàn bộ hệ thống bằng Docker Compose để có thể chạy production-grade với một lệnh duy nhất.

## Đối tượng và phạm vi nghiên cứu

### Đối tượng nghiên cứu

- Các mô hình kiến trúc ứng dụng web hiện đại (monorepo, tách frontend/backend).
- Các framework Node.js: NestJS, Prisma ORM, PostgreSQL.
- Các công nghệ frontend: React, Vite, TailwindCSS, React Router, i18next.
- Các mô hình LLM có thể tích hợp qua HTTP: Google Gemini API, OpenAI API, Ollama (local).
- Quy trình phát triển phần mềm theo mô hình agile.

### Phạm vi nghiên cứu

Hệ thống TravelMind giai đoạn 1 (MVP) bao gồm:

- **Người dùng (USER)**: đăng ký/đăng nhập, hồ sơ cá nhân, đổi mật khẩu, tạo chuyến đi (sinh lịch trình AI), xem lịch sử chuyến đi, xem/xóa yêu thích, khám phá các gợi ý du lịch có sẵn, chat với trợ lý AI.
- **Quản trị viên (ADMIN)**: dashboard thống kê, quản lý người dùng (khoá/mở khoá, xoá), quản lý chuyến đi của mọi người dùng, CRUD gợi ý du lịch (publish/unpublish), phân tích analytics, quản lý ảnh carousel trang chủ.
- **Khách (Guest)**: xem trang chủ, xem danh sách gợi ý, xem chi tiết gợi ý.

**Ngoài phạm vi (Phase 2+)**: thanh toán, email thông báo, bản đồ, thời tiết, Google Places, WebSocket, upload ảnh (admin hiện dán URL), mobile app.

## Phương pháp nghiên cứu

- **Phương pháp nghiên cứu tài liệu**: thu thập và phân tích tài liệu về NestJS, Prisma, React, các API LLM.
- **Phương pháp phân tích thiết kế**: sử dụng UML (Use Case, Class, Sequence, Activity, ERD) để mô hình hoá yêu cầu.
- **Phương pháp thực nghiệm**: xây dựng prototype chạy được, kiểm thử thủ công + tự động.
- **Phương pháp so sánh**: so sánh với các hệ thống lập kế hoạch du lịch hiện có (TripAdvisor, Wanderlog, Layla, Mindtrip).

## Ý nghĩa khoa học và thực tiễn

### Ý nghĩa khoa học

- Làm chủ quy trình tích hợp LLM vào ứng dụng web thương mại: prompt engineering, structured output (JSON mode), fallback khi AI lỗi.
- Áp dụng kiến trúc **pluggable provider pattern** để dễ dàng thay đổi nhà cung cấp AI mà không ảnh hưởng business logic.
- Áp dụng mô hình **monorepo** với **pnpm workspace** để quản lý nhiều ứng dụng trong cùng một repository.

### Ý nghĩa thực tiễn

- Cung cấp cho người dùng Việt Nam một công cụ lập kế hoạch du lịch miễn phí, đa ngôn ngữ, giao diện thân thiện.
- Cung cấp cho quản trị viên một dashboard toàn diện để theo dõi và điều hành hệ thống.
- Làm nền tảng để phát triển thành sản phẩm thương mại: tích hợp booking, đặt vé, thanh toán…

## Cấu trúc của báo cáo

Báo cáo gồm 7 chương:

1. **Chương 1**: Tổng quan và khảo sát hệ thống.
2. **Chương 2**: Phân tích yêu cầu hệ thống (yêu cầu chức năng, phi chức năng, đặc tả use case).
3. **Chương 3**: Thiết kế hệ thống (kiến trúc, công nghệ, sơ đồ UML chi tiết).
4. **Chương 4**: Thiết kế cơ sở dữ liệu (ERD, đặc tả bảng).
5. **Chương 5**: Thiết kế giao diện và triển khai (mockup + mô tả luồng).
6. **Chương 6**: Kiểm thử và đánh giá.
7. **Chương 7**: Kết luận và hướng phát triển.

---

# CHƯƠNG 1: TỔNG QUAN VÀ KHẢO SÁT HỆ THỐNG

## 1.1. Khảo sát các hệ thống hiện có

### 1.1.1. TripAdvisor

TripAdvisor là nền tảng du lịch lớn nhất thế giới, cho phép người dùng đọc đánh giá về khách sạn, nhà hàng, điểm tham quan. Tuy nhiên, TripAdvisor **không tự động sinh lịch trình** cho người dùng; chỉ cung cấp thông tin rời rạc.

### 1.1.2. Wanderlog

Wanderlog là ứng dụng lập kế hoạch du lịch khá phổ biến. Cho phép người dùng tự tạo itinerary bằng cách kéo thả địa điểm vào từng ngày. Tuy nhiên, người dùng vẫn phải tự lựa chọn địa điểm.

### 1.1.3. Layla

Layla là startup AI travel planner, có thể sinh lịch trình tự động bằng AI. Tuy nhiên, giao diện chủ yếu tiếng Anh, ít hỗ trợ tiếng Việt, và giá cả cao.

### 1.1.4. Mindtrip

Mindtrip kết hợp AI + cộng đồng. Lịch trình được sinh tự động nhưng có thể chia sẻ cho bạn bè. Phù hợp nhóm nhưng giao diện phức tạp.

### 1.1.5. Bảng so sánh

**Bảng 1.1.** So sánh TravelMind với các hệ thống hiện có

| Tiêu chí | TripAdvisor | Wanderlog | Layla | Mindtrip | **TravelMind** |
|---|---|---|---|---|---|
| Đánh giá/Review | ✅ | ✅ | ❌ | ✅ | ✅ (chỉ trên rec) |
| Tự tạo itinerary | ❌ | ✅ | ✅ | ✅ | ✅ |
| Sinh lịch trình bằng AI | ❌ | ❌ | ✅ | ✅ | ✅ |
| Tiếng Việt | ✅ | ❌ | ❌ | ❌ | ✅ |
| Quản lý chuyến đi cá nhân | ❌ | ✅ | ✅ | ✅ | ✅ |
| Chat với trợ lý AI | ❌ | ❌ | ✅ | ✅ | ✅ |
| Dashboard quản trị | ✅ | ❌ | ✅ | ❌ | ✅ |
| Tự host (open source) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Chi phí sử dụng | Freemium | Freemium | Paid | Freemium | **Free (chi phí API AI)** |

**Nhận xét**: TravelMind có ưu thế ở chỗ:
- Tự host, miễn phí sử dụng.
- Hỗ trợ tiếng Việt đầy đủ.
- Kết hợp cả sinh lịch trình AI + chat với trợ lý AI + quản lý cá nhân + dashboard quản trị.

## 1.2. Đặt vấn đề và giải pháp

### 1.2.1. Đặt vấn đề

Từ khảo sát trên, có thể thấy chưa có hệ thống nào đáp ứng đầy đủ các yêu cầu:

- Sinh lịch trình bằng AI có cấu trúc rõ ràng.
- Hỗ trợ tiếng Việt hoàn toàn.
- Cho phép quản trị viên quản lý nội dung.
- Triển khai self-hosted với chi phí thấp.

### 1.2.2. Giải pháp đề xuất

Xây dựng **TravelMind** với:

- **Backend**: NestJS + Prisma + PostgreSQL.
- **Frontend**: React + Vite + TailwindCSS.
- **AI Provider abstraction**: 4 nhà cung cấp (Gemini, OpenAI, Ollama, Mock), chuyển đổi qua biến môi trường.
- **Triển khai**: Docker Compose.

## 1.3. Tổng quan hệ thống TravelMind

### 1.3.1. Mô tả chung

TravelMind là hệ thống web cho phép:

- **Người dùng cuối (USER)** lên kế hoạch du lịch cá nhân hóa với lịch trình sinh bởi AI; lưu trữ, chỉnh sửa, xoá các chuyến đi; tương tác với trợ lý AI qua chat; khám phá các gợi ý du lịch có sẵn.
- **Quản trị viên (ADMIN)** quản lý toàn bộ hệ thống: người dùng, chuyến đi, gợi ý du lịch, nội dung trang chủ.

### 1.3.2. Tính năng chính

- **Đăng ký / Đăng nhập**: xác thực bằng JWT, bảo mật bằng bcrypt.
- **Hồ sơ cá nhân**: cập nhật tên, ngôn ngữ, avatar; đổi mật khẩu.
- **Tạo chuyến đi**: nhập điểm đến, ngày bắt đầu/kết thúc, số người, ngân sách, sở thích → AI tự sinh lịch trình chi tiết từng ngày.
- **Quản lý chuyến đi**: xem danh sách, xem chi tiết, xoá.
- **Khám phá gợi ý**: duyệt các itinerary mẫu do admin đăng; yêu thích / bỏ yêu thích.
- **Chat với trợ lý AI**: hỏi đáp về du lịch, có lưu lịch sử hội thoại.
- **Đa ngôn ngữ**: Tiếng Việt + Tiếng Anh.
- **Dark / Light mode**.
- **Admin Dashboard**: tổng quan chỉ số hệ thống.
- **Admin — Quản lý người dùng**: khoá/mở khoá, xoá (có guard chống xoá admin cuối cùng).
- **Admin — Quản lý chuyến đi**: xem toàn bộ, xoá.
- **Admin — Quản lý gợi ý**: CRUD với publish/unpublish.
- **Admin — Phân tích**: tổng số liệu + biểu đồ 6 tháng + top điểm đến + hoạt động gần đây.
- **Admin — Quản lý Hero carousel**: thêm/sửa/xoá/ẩn slide ảnh trên trang chủ.

### 1.3.3. Các tác nhân (Actor)

- **Guest (Khách)**: người dùng chưa đăng nhập, chỉ có thể xem trang chủ + danh sách/chi tiết gợi ý.
- **User (Người dùng đã đăng nhập)**: dùng đầy đủ chức năng cá nhân.
- **Admin (Quản trị viên)**: dùng thêm chức năng quản trị.
- **AI Provider (Nhà cung cấp AI)**: Gemini / OpenAI / Ollama / Mock — hệ thống bên ngoài.
- **Hệ thống bảo mật**: JWT issuer, bcrypt.

### 1.3.4. Sơ đồ Use Case tổng quan

```mermaid
graph TB
  subgraph "Khách (Guest)"
    UC_VIEW_HOME["Xem trang chủ"]
    UC_BROWSE_REC["Xem danh sách gợi ý"]
    UC_VIEW_REC["Xem chi tiết gợi ý"]
    UC_REGISTER["Đăng ký tài khoản"]
    UC_LOGIN["Đăng nhập"]
  end

  subgraph "Người dùng (User)"
    UC_VIEW_PROFILE["Xem & sửa hồ sơ"]
    UC_CHANGE_PW["Đổi mật khẩu"]
    UC_CREATE_TRIP["Tạo chuyến đi (AI)"]
    UC_VIEW_TRIPS["Xem danh sách chuyến đi"]
    UC_VIEW_TRIP["Xem chi tiết chuyến đi"]
    UC_DEL_TRIP["Xoá chuyến đi"]
    UC_FAV_REC["Yêu thích gợi ý"]
    UC_CHAT["Chat với trợ lý AI"]
    UC_LOGOUT["Đăng xuất"]
  end

  subgraph "Quản trị viên (Admin)"
    UC_DASH["Xem dashboard"]
    UC_ANALYTICS["Xem analytics"]
    UC_USERS["Quản lý người dùng"]
    UC_TRIPS_ADMIN["Quản lý chuyến đi"]
    UC_RECS_ADMIN["Quản lý gợi ý"]
    UC_HERO_ADMIN["Quản lý Hero carousel"]
  end

  GUEST((Khách)) --> UC_VIEW_HOME & UC_BROWSE_REC & UC_VIEW_REC & UC_REGISTER & UC_LOGIN
  USER((User)) --> UC_VIEW_PROFILE & UC_CHANGE_PW & UC_CREATE_TRIP & UC_VIEW_TRIPS & UC_VIEW_TRIP & UC_DEL_TRIP & UC_FAV_REC & UC_CHAT & UC_LOGOUT
  ADMIN((Admin)) --> UC_DASH & UC_ANALYTICS & UC_USERS & UC_TRIPS_ADMIN & UC_RECS_ADMIN & UC_HERO_ADMIN
  ADMIN -.kế thừa.-> USER
  USER -.kế thừa.-> GUEST
```

**Hình 1.1.** Sơ đồ Use Case tổng quan hệ thống TravelMind.

## 1.4. Biểu đồ phân rã chức năng

```mermaid
graph TD
  SYS[Hệ thống TravelMind]
  SYS --> A[Quản lý tài khoản]
  SYS --> B[Quản lý chuyến đi]
  SYS --> C[Quản lý gợi ý du lịch]
  SYS --> D[Chat AI]
  SYS --> E[Quản trị hệ thống]

  A --> A1[Đăng ký]
  A --> A2[Đăng nhập]
  A --> A3[Xem/sửa hồ sơ]
  A --> A4[Đổi mật khẩu]
  A --> A5[Đăng xuất]

  B --> B1[Tạo chuyến đi]
  B --> B2[Sinh lịch trình AI]
  B --> B3[Xem danh sách]
  B --> B4[Xem chi tiết]
  B --> B5[Xoá]

  C --> C1[Xem danh sách]
  C --> C2[Xem chi tiết]
  C --> C3[Yêu thích / Bỏ yêu thích]

  D --> D1[Tạo phiên chat]
  D --> D2[Gửi tin nhắn]
  D --> D3[Xem lịch sử chat]
  D --> D4[Xoá phiên chat]

  E --> E1[Dashboard]
  E --> E2[Analytics]
  E --> E3[Quản lý người dùng]
  E --> E4[Quản lý chuyến đi]
  E --> E5[Quản lý gợi ý]
  E --> E6[Quản lý Hero carousel]
```

**Hình 1.2.** Biểu đồ phân rã chức năng.

---

# CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG

## 2.1. Yêu cầu chức năng

### 2.1.1. Bảng yêu cầu chức năng

**Bảng 2.1.** Yêu cầu chức năng của hệ thống.

| Mã | Module | Tên chức năng | Mô tả | Actor |
|---|---|---|---|---|
| FR-01 | Auth | Đăng ký | Tạo tài khoản mới bằng tên, email, mật khẩu (mật khẩu mã hoá bcrypt, email unique, chuẩn hoá lowercase) | Guest |
| FR-02 | Auth | Đăng nhập | Xác thực email + password, trả về JWT + thông tin user | Guest |
| FR-03 | Users | Xem hồ sơ | Lấy thông tin profile đang đăng nhập | User, Admin |
| FR-04 | Users | Cập nhật hồ sơ | Sửa tên, ngôn ngữ, avatar | User, Admin |
| FR-05 | Users | Đổi mật khẩu | Yêu cầu currentPassword đúng, newPassword khác currentPassword | User, Admin |
| FR-06 | Trips | Tạo chuyến đi | Nhận destination, dates, travelers, budget, preferences → gọi AI sinh lịch trình → lưu | User |
| FR-07 | Trips | Danh sách chuyến đi | Trả về trips thuộc user đang đăng nhập, mới nhất trước | User |
| FR-08 | Trips | Chi tiết chuyến đi | Trả về trip + itinerary, kiểm tra quyền sở hữu | User |
| FR-09 | Trips | Xoá chuyến đi | Xoá trip + cascade itineraries | User |
| FR-10 | Recommendations | Danh sách (public) | Lấy các recommendation đã publish | Guest, User, Admin |
| FR-11 | Recommendations | Chi tiết (public) | Lấy chi tiết rec đã publish | Guest, User, Admin |
| FR-12 | Favorites | Danh sách yêu thích | Lấy các rec user đã like | User |
| FR-13 | Favorites | Thêm yêu thích | Toggle like | User |
| FR-14 | Favorites | Bỏ yêu thích | Toggle unlike | User |
| FR-15 | Chat | Danh sách phiên | Tối đa 20 phiên gần nhất | User |
| FR-16 | Chat | Tạo phiên | Tạo session mới | User |
| FR-17 | Chat | Lấy tin nhắn | Lấy lịch sử messages | User |
| FR-18 | Chat | Gửi tin nhắn | Gọi AI chat với history → trả về userMessage + assistantMessage | User |
| FR-19 | Chat | Xoá phiên | Xoá session + cascade messages | User |
| FR-20 | Admin | Dashboard | Tổng số users, trips, recommendations, publishedRecs | Admin |
| FR-21 | Admin | Analytics | Tổng số + monthlyTrips 6 tháng + recsByCategory + topDestinations + recentActivity | Admin |
| FR-22 | Admin | Quản lý users | List, khoá/mở khoá, xoá (guard admin cuối cùng) | Admin |
| FR-23 | Admin | Quản lý trips | List toàn bộ trips của mọi user, xoá | Admin |
| FR-24 | Admin | Quản lý recs | CRUD + publish/unpublish | Admin |
| FR-25 | Admin | Quản lý Hero | CRUD slide ảnh + reorder (up/down) + ẩn/hiện | Admin |
| FR-26 | Hero public | Lấy slide đang hiển thị | Cache 60s | Guest, User, Admin |

### 2.1.2. Đặc tả chi tiết một số Use Case chính

#### UC-06: Tạo chuyến đi bằng AI

- **Tên**: Tạo chuyến đi và sinh lịch trình AI.
- **Actor chính**: User.
- **Mô tả**: User nhập thông tin chuyến đi, hệ thống gọi AI Provider để sinh lịch trình JSON, lưu vào DB và trả về trip vừa tạo.
- **Điều kiện trước**: User đã đăng nhập.
- **Luồng chính**:
  1. User nhập destination, startDate, endDate, travelers, budget, preferences.
  2. Frontend POST `/api/trips` với body trên.
  3. Backend validate: endDate ≥ startDate, travelers ≥ 1.
  4. Backend gọi `AiService.generateItinerary(input)`.
  5. AI Provider trả về `GeneratedItinerary` JSON.
  6. Backend tạo Trip + Itinerary trong 1 transaction.
  7. Backend trả về trip format kèm itinerary content (parsed JSON).
- **Luồng thay thế**:
  - 5a. AI lỗi → backend trả `InternalServerError`, frontend hiển thị toast lỗi.
  - 5b. AI thiếu key (Gemini/OpenAI) → fallback Mock Provider tự động.
- **Điều kiện sau**: Trip được lưu với status `GENERATED`, user có thể xem chi tiết.

#### UC-18: Gửi tin nhắn chat với trợ lý

- **Tên**: Chat với trợ lý AI.
- **Actor chính**: User.
- **Mô tả**: User gửi tin nhắn trong một phiên chat, hệ thống gọi AI với lịch sử hội thoại (tối đa 20 message gần nhất), lưu cả userMessage và assistantMessage.
- **Điều kiện trước**: User đã đăng nhập, có phiên chat (hoặc tự tạo mới).
- **Luồng chính**:
  1. User nhập nội dung tin nhắn.
  2. Frontend POST `/api/chat/sessions/:id/messages` với `{ content }`.
  3. Backend kiểm tra session thuộc user (`ensureSession`).
  4. Lưu userMessage (role=USER).
  5. Lấy CHAT_HISTORY_LIMIT (20) tin nhắn gần nhất → reverse → kèm system prompt.
  6. Gọi `AiService.chat(messages)`.
  7. Lưu assistantMessage (role=ASSISTANT).
  8. Nếu session.title rỗng → set title từ content (slice 60 ký tự đầu).
  9. Trả về `{ userMessage, assistantMessage }`.

#### UC-25: Admin quản lý Hero carousel

- **Tên**: Quản lý slide ảnh carousel trang chủ.
- **Actor chính**: Admin.
- **Mô tả**: Admin thêm/sửa/xoá/ẩn/đổi thứ tự slide ảnh hiển thị ở landing page.
- **Điều kiện trước**: Admin đã đăng nhập.
- **Luồng chính — Thêm slide**:
  1. Admin vào `/admin/hero`.
  2. Bấm "+ Thêm slide" → modal mở.
  3. Nhập URL ảnh (validate `https?://...`).
  4. Modal preview ảnh ngay khi nhập URL hợp lệ.
  5. Submit → POST `/api/admin/hero/slides` → DB insert.
  6. Public cache bị invalidate.
  7. Toast "Đã thêm slide mới".
- **Luồng thay thế**:
  - 5a. URL không hợp lệ → báo lỗi, không submit.
  - 5b. Ảnh URL không load được → hiển thị ảnh mờ, vẫn cho submit.
- **Luồng con — Reorder**:
  1. Admin bấm ↑/↓ trên dòng.
  2. POST `/api/admin/hero/slides/:id/move` `{ direction }`.
  3. Backend thực hiện atomic 3-step transaction swap sortOrder để tránh collision.
  4. Cache bị invalidate.

## 2.2. Yêu cầu phi chức năng

**Bảng 2.2.** Yêu cầu phi chức năng.

| Mã | Yêu cầu | Mô tả |
|---|---|---|
| NFR-01 | Hiệu năng | Thời gian phản hồi API < 500ms cho các endpoint thông thường; sinh itinerary AI chấp nhận đến 90s (timeout riêng `aiApi` 90s) |
| NFR-02 | Bảo mật | Mật khẩu lưu bcrypt cost 10; JWT có expiry 7d; validation pipe whitelist + forbid-non-whitelisted; CORS cấu hình rõ origin |
| NFR-03 | Khả dụng | Triển khai Docker Compose single-command; cơ chế auto-fallback AI provider khi thiếu key |
| NFR-04 | Khả năng mở rộng | Kiến trúc plugin provider cho AI; tách module backend rõ ràng |
| NFR-05 | Đa ngôn ngữ | Tiếng Việt (mặc định) + Tiếng Anh; sử dụng i18next |
| NFR-06 | Responsive | Giao diện web responsive từ mobile đến desktop |
| NFR-07 | Theme | Light + Dark mode với CSS variables |
| NFR-08 | Validation | class-validator + DTO ràng buộc mọi input ở backend; frontend validate trước submit |
| NFR-09 | Audit | Log lỗi NestJS Logger + toast thông báo lỗi từ interceptor |
| NFR-10 | Khả năng tương thích | Trình duyệt: Chrome, Edge, Firefox, Safari phiên bản hiện đại |

## 2.3. Phân quyền

**Bảng 2.3.** Phân quyền theo vai trò.

| Endpoint | Guest | User | Admin |
|---|:---:|:---:|:---:|
| GET /recommendations, /recommendations/:id | ✅ | ✅ | ✅ |
| GET /hero/slides | ✅ | ✅ | ✅ |
| POST /auth/register, /auth/login | ✅ | — | — |
| GET /users/me, PATCH /users/me, POST /users/me/password | — | ✅ | ✅ |
| /trips/* | — | ✅ (chỉ trip của mình) | ✅ |
| /favorites/* | — | ✅ | ✅ |
| /chat/* | — | ✅ | ✅ |
| /ai/generate (gọi từ frontend khi tạo trip) | — | ✅ | ✅ |
| /admin/* | — | — | ✅ |
| /admin/hero/* | — | — | ✅ |

Cơ chế bảo vệ ở backend:
- `JwtAuthGuard` (global): kiểm tra JWT hợp lệ.
- `RolesGuard` + `@Roles('ADMIN')`: ràng buộc route admin.
- `@Public()` decorator: đánh dấu route không cần auth.

Cơ chế bảo vệ ở frontend:
- `ProtectedRoute` component: chuyển hướng về `/login` nếu chưa đăng nhập; chuyển về `/` nếu không phải admin và `requireAdmin=true`.

## 2.4. Mô hình Use Case chi tiết

```mermaid
graph LR
  subgraph "FR-06 Tạo chuyến đi"
    UC_F6_1((Nhập thông tin chuyến đi))
    UC_F6_2((Validate form))
    UC_F6_3((Gọi AI sinh lịch trình))
    UC_F6_4((Lưu Trip + Itinerary))
    UC_F6_5((Hiển thị lịch trình))
  end
  USER2((User)) --> UC_F6_1 --> UC_F6_2 --> UC_F6_3 --> UC_F6_4 --> UC_F6_5
```

**Hình 2.1.** Use case UC-06 — Tạo chuyến đi bằng AI.

---

# CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

## 3.1. Kiến trúc tổng quan

Hệ thống áp dụng kiến trúc **monorepo client-server** tách biệt, giao tiếp qua REST API + JWT.

```mermaid
graph TB
  subgraph "Client - React + Vite"
    UI[Giao diện người dùng<br/>React 18 + TailwindCSS]
    STATE[State management<br/>AuthContext, ThemeContext,<br/>FavoritesProvider]
    I18N[i18next Vi/An]
    AXIOS[Axios HTTP Client]
  end

  subgraph "Server - NestJS 10"
    CTRL[Controllers]
    SVC[Services]
    GUARDS[Guards<br/>JwtAuthGuard, RolesGuard]
    AI[AI Service<br/>+ Provider Factory]
    DB[(PostgreSQL<br/>via Prisma 5)]
  end

  subgraph "External"
    GEMINI[Google Gemini API]
    OPENAI[OpenAI API]
    OLLAMA[Ollama local]
  end

  subgraph "Infrastructure"
    DOCKER[Docker Compose]
    NGINX[Nginx static serve]
  end

  UI --> STATE --> AXIOS
  AXIOS -->|REST + JWT| CTRL
  CTRL --> GUARDS --> SVC
  SVC --> DB
  AI --> GEMINI
  AI --> OPENAI
  AI --> OLLAMA
  DOCKER -.hosts.-> Client
  DOCKER -.hosts.-> Server
  DOCKER -.hosts.-> DB
  NGINX -.serve SPA.-> UI
```

**Hình 3.1.** Sơ đồ kiến trúc tổng quan.

### 3.1.1. Lựa chọn kiến trúc

- **Monorepo với pnpm workspace**: dễ quản lý dependency chung, chia sẻ types, scripts đồng bộ.
- **Client-server tách biệt**: frontend có thể deploy độc lập lên CDN/edge; backend scale riêng.
- **REST API**: đơn giản, dễ test với Postman, đủ dùng cho MVP.

## 3.2. Công nghệ sử dụng

**Bảng 3.1.** Bảng công nghệ sử dụng (phiên bản thực tế trong `package.json`).

| Tầng | Công nghệ | Phiên bản | Mục đích |
|---|---|---|---|
| Frontend — UI | React | 18.3.1 | Thư viện UI |
| Frontend — Bundler | Vite | 5.4.6 | Build & dev server |
| Frontend — Ngôn ngữ | TypeScript | 5.5.4 | Type safety |
| Frontend — Routing | React Router DOM | 6.26.2 | SPA routing |
| Frontend — HTTP | Axios | 1.7.7 | HTTP client |
| Frontend — i18n | i18next + react-i18next | 23.15.1 / 15.0.2 | Đa ngôn ngữ |
| Frontend — Style | TailwindCSS | 3.4.10 | Utility-first CSS |
| Frontend — UI helper | clsx | 2.1.1 | Class name |
| Frontend — Toast | react-hot-toast | 2.4.1 | Thông báo |
| Backend — Framework | NestJS | 10.4.0 | Node framework |
| Backend — ORM | Prisma | 5.22.0 | ORM + migrations |
| Backend — DB Driver | @prisma/client | 5.22.0 | Prisma client |
| Backend — Auth | @nestjs/jwt + passport-jwt | 10.2.0 / 4.0.1 | JWT |
| Backend — Hashing | bcrypt | 5.1.1 | Mật khẩu |
| Backend — Validation | class-validator + class-transformer | 0.14.1 / 0.5.1 | DTO validation |
| Backend — Config | @nestjs/config | 3.2.3 | Env config |
| Database | PostgreSQL | 16 | RDBMS |
| AI Provider | Gemini API / OpenAI / Ollama / Mock | — | Sinh nội dung |
| Container | Docker + Docker Compose | — | Triển khai |
| HTTP Server (web) | Nginx | alpine | SPA serving |
| Package Manager | pnpm | 9.0.0 | Monorepo deps |

## 3.3. Sơ đồ luồng request

```mermaid
sequenceDiagram
  participant U as User Browser
  participant N as Nginx
  participant F as React App (Vite)
  participant Ax as Axios Instance
  participant G as JwtAuthGuard
  participant C as Controller
  participant S as Service
  participant DB as PostgreSQL

  U->>N: GET /api/trips
  N->>F: serve SPA
  U->>F: render React
  F->>Ax: axios.get('/trips')
  Ax->>Ax: thêm Authorization header
  Ax->>G: request
  G->>G: verify JWT
  alt JWT hợp lệ
    G->>C: forward
    C->>S: listByUser(userId)
    S->>DB: SELECT trips WHERE userId
    DB-->>S: rows
    S-->>C: formatted trips
    C-->>Ax: JSON 200
    Ax-->>F: data
    F-->>U: render UI
  else JWT lỗi/hết hạn
    G-->>Ax: 401
    Ax->>Ax: tokenStorage.clear()
    Ax-->>F: error
  end
```

**Hình 3.2.** Sơ đồ luồng request (ví dụ GET /trips).

## 3.4. Sơ đồ Activity — Tạo chuyến đi

```mermaid
graph TD
  A([Bắt đầu]) --> B[User nhập form: destination, dates, travelers, budget, preferences]
  B --> C{Validate phía client}
  C -->|Invalid| B
  C -->|Valid| D[POST /api/trips]
  D --> E{Validate phía server}
  E -->|endDate < startDate| F[Trả 400 BadRequest]
  E -->|Valid| G[AiService.generateItinerary]
  G --> H{AI_PROVIDER?}
  H -->|gemini| I[GeminiAiProvider]
  H -->|openai| J[OpenAiProvider]
  H -->|ollama| K[OllamaAiProvider]
  H -->|mock| L[MockAiProvider]
  I --> M{API key?}
  J --> M
  M -->|No| L
  M -->|Yes| N[Gọi API + extract JSON]
  L --> O[Sinh JSON deterministic]
  N --> P[Normalize thành GeneratedItinerary]
  O --> P
  P --> Q[Tạo Trip + Itinerary trong DB]
  Q --> R[Trả về trip format]
  R --> S[Render trang chi tiết chuyến đi]
  S --> T([Kết thúc])
```

**Hình 3.3.** Activity diagram — Tạo chuyến đi bằng AI.

## 3.5. Sơ đồ Sequence — Đăng nhập

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant API as AuthController
  participant S as AuthService
  participant DB as PostgreSQL

  U->>F: Nhập email + password
  F->>API: POST /api/auth/login { email, password }
  API->>S: auth.login(email, password)
  S->>DB: findUnique user by email
  DB-->>S: user row (kèm password hash)
  alt user null
    S-->>API: throw UnauthorizedException
    API-->>F: 401 "Invalid credentials"
  else user tồn tại
    S->>S: check status == ACTIVE
    alt user LOCKED
      S-->>API: throw AccountLockedException
      API-->>F: 423 (locked)
    else ACTIVE
      S->>S: bcrypt.compare(password, hash)
      alt ok == false
        S-->>API: throw UnauthorizedException
        API-->>F: 401
      else ok
        S->>S: jwt.sign(payload)
        S-->>API: { accessToken, user }
        API-->>F: 200
        F->>F: localStorage.set('travelmind_token', token)
        F->>F: setUser(...)
        F-->>U: redirect đến '/'
      end
    end
  end
```

**Hình 3.4.** Sequence diagram — Đăng nhập.

## 3.6. Sơ đồ Sequence — Sinh lịch trình bằng AI

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant TC as TripsController
  participant TS as TripsService
  participant AI as AiService
  participant P as Provider (Gemini/Mock)
  participant DB as PostgreSQL

  U->>F: Submit form tạo trip
  F->>TC: POST /api/trips { destination, startDate, endDate, travelers, budget, preferences }
  TC->>TS: trips.create(userId, dto)
  TS->>TS: validate dates
  TS->>AI: generateItinerary({ destination, dates, travelers, budget, preferences })
  AI->>P: provider.generateItinerary(input)
  alt Provider = Gemini
    P->>P: buildPrompt(input)
    P->>P: fetch Gemini API
    P->>P: extract JSON
    P->>P: normalize → GeneratedItinerary
  else Provider = Mock
    P->>P: deterministic mock
  end
  P-->>AI: GeneratedItinerary
  AI-->>TS: GeneratedItinerary
  TS->>DB: INSERT trip + INSERT itinerary (content=JSON.stringify(...))
  DB-->>TS: trip + itinerary
  TS->>TS: formatTrip (parse content)
  TS-->>TC: Trip formatted
  TC-->>F: 201 trip object
  F->>F: navigate /trips/:id
```

**Hình 3.5.** Sequence diagram — Sinh lịch trình bằng AI.

## 3.7. Sơ đồ Sequence — Chat với trợ lý

```mermaid
sequenceDiagram
  participant U as User
  participant F as ChatPanel
  participant C as ChatController
  participant S as ChatService
  participant DB as PostgreSQL
  participant AI as AiService

  U->>F: Nhập message + Enter
  F->>C: POST /api/chat/sessions/:id/messages { content }
  C->>S: sendMessage(userId, sessionId, dto)
  S->>S: ensureSession(userId, sessionId)
  S->>DB: INSERT chat_message (role=USER, content)
  DB-->>S: userMessage
  S->>DB: SELECT last 20 messages
  DB-->>S: history rows
  S->>S: map → AiChatMessage[] kèm system prompt
  S->>AI: chat(messages)
  AI->>AI: provider.chat(messages) → string
  AI-->>S: assistantText
  S->>DB: INSERT chat_message (role=ASSISTANT, content=assistantText)
  DB-->>S: assistantMessage
  alt session.title empty
    S->>DB: UPDATE chat_session SET title = slice(60)
  end
  S-->>C: { userMessage, assistantMessage }
  C-->>F: response
  F->>F: append to UI
```

**Hình 3.6.** Sequence diagram — Chat với trợ lý AI.

## 3.8. Sơ đồ Sequence — Admin quản lý Hero carousel

```mermaid
sequenceDiagram
  participant A as Admin
  participant F as AdminHeroPage
  participant C as HeroController
  participant S as HeroService
  participant DB as PostgreSQL

  A->>F: Bấm "Thêm slide"
  F->>F: mở HeroSlideFormModal
  A->>F: nhập imageUrl
  F->>F: validate /^https?:\/\/\S+/i
  A->>F: Submit
  F->>C: POST /api/admin/hero/slides { imageUrl }
  C->>S: hero.create(dto)
  S->>DB: INSERT hero_slide
  DB-->>S: row
  S->>S: invalidateCache()
  S-->>C: AdminHeroSlide
  C-->>F: 201
  F->>F: append to list + toast

  Note over F: Reorder luồng
  A->>F: Bấm ↑/↓
  F->>C: POST /api/admin/hero/slides/:id/move { direction }
  C->>S: hero.move(id, direction)
  S->>DB: SELECT all slides sorted
  S->>S: find idx, swapIdx
  S->>DB: $transaction [update(a, -1), update(b, a.sortOrder), update(a, b.sortOrder)]
  S->>S: invalidateCache()
  S-->>C: updated slide
  C-->>F: 200
  F->>F: reload list
```

**Hình 3.7.** Sequence diagram — Admin quản lý Hero carousel.

## 3.9. Sơ đồ Component giao diện

```mermaid
graph TB
  subgraph "Layouts"
    ML[MainLayout]
    AL[AdminLayout]
  end

  subgraph "Pages - Public"
    HP[HomePage]
    LP[LoginPage]
    RP[RegisterPage]
    RCP[RecommendationsPage]
    RCDP[RecommendationDetailPage]
  end

  subgraph "Pages - User"
    CTP[CreateTripPage]
    MTP[MyTripsPage]
    TDP[TripDetailPage]
    PP[ProfilePage]
  end

  subgraph "Pages - Admin"
    ADP[AdminDashboardPage]
    AUP[AdminUsersPage]
    ATR[AdminTripsPage]
    ARP[AdminRecommendationsPage]
    ARF[AdminRecommendationFormPage]
    AAN[AdminAnalyticsPage]
    ASP[AdminSettingsPage]
    AHP[AdminHeroPage]
  end

  subgraph "Components - Common"
    HS[HeroSlideshow]
    FB[FavoriteButton]
    IV[ItineraryView]
    LS[LoadingState]
    ES[EmptyState]
    ERS[ErrorState]
    LSW[LanguageSwitcher]
    TT[ThemeToggle]
    PEM[ProfileEditModal]
    CP[ConfirmProvider]
  end

  subgraph "Components - Chat"
    CW[ChatWidget]
    CP2[ChatPanel]
    SL[SessionList]
    CML[ChatMessageList]
    CI[ChatInput]
  end

  subgraph "Services & Store"
    AX[axios instance]
    AC[AuthContext]
    TC[ThemeContext]
    FP[FavoritesProvider]
  end

  ML --> HP & LP & RP & RCP & RCDP & CTP & MTP & TDP & PP
  ML --> PEM & LSW & TT & CW
  AL --> ADP & AUP & ATR & ARP & ARF & AAN & ASP & AHP
  AL --> PEM & LSW & TT

  HP --> HS & LS & ERS & ES
  RCP --> FB & LS & ES & ERS
  CTP --> LS & ERS
  MTP --> LS & ES & ERS
  TDP --> IV & LS & ERS
  PP --> PEM & LS

  ADP --> LS & ERS
  AUP --> PEM & LS
  ARP --> LS & ES & ERS
  AHP --> LS & ES & ERS
  ATR --> LS & ES & ERS
  AAN --> LS & ERS

  CW --> CP2 --> SL & CML & CI
```

**Hình 3.8.** Sơ đồ Component giao diện.

## 3.10. Bảng API endpoint

**Bảng 3.2.** Bảng các API endpoint.

| Method | Path | Auth | Mô tả |
|---|---|---|---|
| GET  | /api/health | Public | Health check |
| POST | /api/auth/register | Public | Đăng ký |
| POST | /api/auth/login | Public | Đăng nhập |
| GET  | /api/users/me | User | Hồ sơ hiện tại |
| PATCH| /api/users/me | User | Cập nhật hồ sơ |
| POST | /api/users/me/password | User | Đổi mật khẩu |
| POST | /api/trips | User | Tạo chuyến đi (gọi AI) |
| GET  | /api/trips | User | Danh sách chuyến đi của tôi |
| GET  | /api/trips/:id | User | Chi tiết chuyến đi |
| DELETE | /api/trips/:id | User | Xoá chuyến đi |
| GET  | /api/recommendations | Public | Danh sách rec đã publish |
| GET  | /api/recommendations/:id | Public | Chi tiết rec |
| GET  | /api/favorites | User | Danh sách yêu thích |
| GET  | /api/favorites/ids | User | Chỉ IDs (để mark UI) |
| POST | /api/favorites/:recommendationId | User | Toggle yêu thích |
| DELETE | /api/favorites/:recommendationId | User | Bỏ yêu thích |
| GET  | /api/chat/sessions | User | Danh sách phiên |
| POST | /api/chat/sessions | User | Tạo phiên |
| GET  | /api/chat/sessions/:id/messages | User | Lấy messages |
| POST | /api/chat/sessions/:id/messages | User | Gửi message |
| DELETE | /api/chat/sessions/:id | User | Xoá phiên |
| POST | /api/ai/generate | User | Gọi AI generate itinerary trực tiếp (alias) |
| GET  | /api/hero/slides | Public | Slide đang hiển thị (cache 60s) |
| GET  | /api/admin/dashboard | Admin | Thống kê tổng quan |
| GET  | /api/admin/analytics | Admin | Analytics chi tiết |
| GET  | /api/admin/users | Admin | Danh sách users |
| DELETE | /api/admin/users/:id | Admin | Xoá user (guard admin cuối) |
| PATCH | /api/admin/users/:id/status | Admin | Khoá/mở khoá |
| GET  | /api/admin/trips | Admin | Danh sách tất cả trips |
| DELETE | /api/admin/trips/:id | Admin | Xoá trip bất kỳ |
| GET  | /api/admin/recommendations | Admin | Tất cả recs (cả nháp) |
| POST | /api/admin/recommendations | Admin | Tạo rec |
| PATCH | /api/admin/recommendations/:id | Admin | Sửa rec |
| PATCH | /api/admin/recommendations/:id/publish | Admin | Publish |
| DELETE | /api/admin/recommendations/:id | Admin | Xoá rec |
| GET  | /api/admin/hero/slides | Admin | Tất cả slides |
| POST | /api/admin/hero/slides | Admin | Tạo slide |
| PATCH | /api/admin/hero/slides/:id | Admin | Sửa slide |
| POST | /api/admin/hero/slides/:id/move | Admin | Reorder |
| DELETE | /api/admin/hero/slides/:id | Admin | Xoá slide |

## 3.11. Bảng các module NestJS

**Bảng 3.1.** Bảng các module NestJS.

| Module | Path | Controller | Service | Responsibility |
|---|---|---|---|---|
| AuthModule | src/auth | AuthController | AuthService | register, login, JWT |
| UsersModule | src/users | UsersController | UsersService | profile, changePassword |
| TripsModule | src/trips | TripsController | TripsService | CRUD trip + gọi AI |
| RecommendationsModule | src/recommendations | RecommendationsController | RecommendationsService | Public + Admin CRUD |
| AdminModule | src/admin | AdminController | AdminService | dashboard, analytics, user mgmt, recommendation mgmt |
| FavoritesModule | src/favorites | FavoritesController | FavoritesService | toggle favorite |
| ChatModule | src/chat | ChatController | ChatService | sessions, messages, AI chat |
| AiModule | src/ai | AiController | AiService + 4 providers | Provider factory |
| HeroModule | src/hero | HeroController | HeroService | Public hero carousel + Admin CRUD |

---

# CHƯƠNG 4: THIẾT KẾ CƠ SỞ DỮ LIỆU

## 4.1. Sơ đồ ERD

```mermaid
erDiagram
  USER ||--o{ TRIP : "owns"
  USER ||--o{ FAVORITE : "likes"
  USER ||--o{ CHAT_SESSION : "has"
  TRIP ||--|| ITINERARY : "has (1:1 today)"
  RECOMMENDATION ||--o{ FAVORITE : "favorited by"
  CHAT_SESSION ||--o{ CHAT_MESSAGE : "contains"
  HERO_SLIDE {
    string id PK
    string imageUrl
    int sortOrder
    boolean isActive
    datetime createdAt
    datetime updatedAt
  }

  USER {
    string id PK
    string name
    string email UK
    string password
    enum role "USER | ADMIN"
    enum status "ACTIVE | LOCKED"
    string language "default vi"
    string avatar
    datetime createdAt
    datetime updatedAt
  }

  TRIP {
    string id PK
    string userId FK
    string destination
    date startDate
    date endDate
    int travelers
    string budget
    string preferences
    enum status "DRAFT | GENERATED | ARCHIVED"
    datetime createdAt
    datetime updatedAt
  }

  ITINERARY {
    string id PK
    string tripId FK
    string title
    string description
    string content "JSON encoded"
    datetime createdAt
    datetime updatedAt
  }

  RECOMMENDATION {
    string id PK
    string title
    string description
    string destination
    string image
    string content "JSON encoded"
    boolean isPublished
    enum category "NATURE | CULTURE | RESORT | ADVENTURE | BEACH"
    int price
    float rating
    int reviewCount
    datetime createdAt
    datetime updatedAt
  }

  FAVORITE {
    string id PK
    string userId FK
    string recommendationId FK
    datetime createdAt
  }

  CHAT_SESSION {
    string id PK
    string userId FK
    string title
    datetime createdAt
    datetime updatedAt
  }

  CHAT_MESSAGE {
    string id PK
    string sessionId FK
    enum role "USER | ASSISTANT | SYSTEM"
    string content
    datetime createdAt
  }
```

**Hình 4.1.** Sơ đồ ERD hệ thống TravelMind.

## 4.2. Mô tả chi tiết các bảng

### 4.2.1. Bảng `users`

**Bảng 4.1.** Cấu trúc bảng `users`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | Định danh |
| name | String | NOT NULL | — | Họ tên |
| email | String | UNIQUE, NOT NULL | — | Email (lowercase) |
| password | String | NOT NULL | — | bcrypt hash |
| role | enum UserRole | NOT NULL | USER | Phân quyền |
| status | enum UserStatus | NOT NULL | ACTIVE | Khoá/Mở |
| language | String | NOT NULL | "vi" | Ngôn ngữ UI |
| avatar | String | NOT NULL | "" | URL avatar |
| createdAt | DateTime | NOT NULL | now() | Ngày tạo |
| updatedAt | DateTime | NOT NULL | @updatedAt | Ngày sửa |

Index: `users_email_key` UNIQUE(email).

### 4.2.2. Bảng `trips`

**Bảng 4.2.** Cấu trúc bảng `trips`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| userId | String | FK→users.id ON DELETE CASCADE | — | |
| destination | String | NOT NULL | — | |
| startDate | DateTime | NOT NULL | — | |
| endDate | DateTime | NOT NULL | — | |
| travelers | Int | NOT NULL | — | |
| budget | String | NOT NULL | — | Free-form |
| preferences | String | NOT NULL | "" | |
| status | enum TripStatus | NOT NULL | DRAFT | |
| createdAt | DateTime | NOT NULL | now() | |
| updatedAt | DateTime | NOT NULL | @updatedAt | |

Index: `trips_userId_idx`.

### 4.2.3. Bảng `itineraries`

**Bảng 4.3.** Cấu trúc bảng `itineraries`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| tripId | String | FK→trips.id ON DELETE CASCADE | — | |
| title | String | NOT NULL | — | |
| description | String | NOT NULL | "" | |
| content | String | NOT NULL | — | JSON encoded |
| createdAt | DateTime | NOT NULL | now() | |
| updatedAt | DateTime | NOT NULL | @updatedAt | |

Index: `itineraries_tripId_idx`.

### 4.2.4. Bảng `recommendations`

**Bảng 4.4.** Cấu trúc bảng `recommendations`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| title | String | NOT NULL | — | |
| description | String | NOT NULL | — | |
| destination | String | NOT NULL | — | |
| image | String | NOT NULL | "" | URL |
| content | String | NOT NULL | — | JSON encoded (cùng schema với Itinerary.content) |
| isPublished | Boolean | NOT NULL | false | |
| category | enum RecCategory | NOT NULL | NATURE | |
| price | Int | NOT NULL | 0 | VND |
| rating | Float | NOT NULL | 4.5 | |
| reviewCount | Int | NOT NULL | 0 | |
| createdAt | DateTime | NOT NULL | now() | |
| updatedAt | DateTime | NOT NULL | @updatedAt | |

Index: `recommendations_isPublished_idx`, `recommendations_category_idx`.

### 4.2.5. Bảng `favorites`

**Bảng 4.5.** Cấu trúc bảng `favorites`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| userId | String | FK→users.id ON DELETE CASCADE | — | |
| recommendationId | String | FK→recommendations.id ON DELETE CASCADE | — | |
| createdAt | DateTime | NOT NULL | now() | |

Index: `favorites_userId_recommendationId_key` UNIQUE, `favorites_userId_idx`.

### 4.2.6. Bảng `chat_sessions`

**Bảng 4.6.** Cấu trúc bảng `chat_sessions`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| userId | String | FK→users.id ON DELETE CASCADE | — | |
| title | String | NOT NULL | "" | Tự set khi message đầu |
| createdAt | DateTime | NOT NULL | now() | |
| updatedAt | DateTime | NOT NULL | @updatedAt | |

Index: `chat_sessions_userId_updatedAt_idx`.

### 4.2.7. Bảng `chat_messages`

**Bảng 4.7.** Cấu trúc bảng `chat_messages`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| sessionId | String | FK→chat_sessions.id ON DELETE CASCADE | — | |
| role | enum ChatRole | NOT NULL | — | USER/ASSISTANT/SYSTEM |
| content | String | NOT NULL | — | |
| createdAt | DateTime | NOT NULL | now() | |

Index: `chat_messages_sessionId_createdAt_idx`.

### 4.2.8. Bảng `hero_slides`

**Bảng 4.8.** Cấu trúc bảng `hero_slides`.

| Cột | Kiểu | Ràng buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| id | String | PK | cuid() | |
| imageUrl | String | NOT NULL | — | URL https |
| sortOrder | Int | NOT NULL | 0 | Thứ tự render |
| isActive | Boolean | NOT NULL | true | Ẩn/Hiện |
| createdAt | DateTime | NOT NULL | now() | |
| updatedAt | DateTime | NOT NULL | @updatedAt | |

Index: `hero_slides_isActive_sortOrder_idx`.

## 4.3. Sơ đồ logic chuyển đổi ERD → quan hệ

```mermaid
graph LR
  USER[users<br/>PK id]
  TRIP[trips<br/>PK id, FK userId]
  ITI[itineraries<br/>PK id, FK tripId]
  REC[recommendations<br/>PK id]
  FAV[favorites<br/>PK id, FK userId, FK recommendationId]
  CS[chat_sessions<br/>PK id, FK userId]
  CM[chat_messages<br/>PK id, FK sessionId]
  HS[hero_slides<br/>PK id]

  USER --1:N--> TRIP
  TRIP --1:1--> ITI
  USER --1:N--> FAV
  REC --1:N--> FAV
  USER --1:N--> CS
  CS --1:N--> CM
```

**Hình 4.2.** Sơ đồ quan hệ giữa các bảng.

## 4.4. Lược đồ JSON `Itinerary.content`

Một chuyến đi hoặc recommendation lưu JSON trong `content`:

```json
{
  "title": "Khám phá Đà Lạt 3N2Đ",
  "summary": "Hành trình tham quan Đà Lạt...",
  "coverImage": "https://source.unsplash.com/1200x800/?da-lat",
  "days": [
    {
      "day": 1,
      "date": "2025-04-10",
      "theme": "Đón Đà Lạt buổi sáng",
      "activities": [
        {
          "time": "08:00",
          "title": "Ăn sáng phở ở chợ Đà Lạt",
          "description": "Thưởng thức phở bò Đà Lạt...",
          "location": "Chợ Đà Lạt",
          "estimatedCost": "50.000 VND",
          "transport": "Đi bộ",
          "imageUrl": "https://source.unsplash.com/800x600/?pho-da-lat",
          "category": "FOOD"
        }
      ]
    }
  ],
  "tips": ["Mặc áo khoác vì Đà Lạt lạnh buổi tối"]
}
```

---

# CHƯƠNG 5: THIẾT KẾ GIAO DIỆN VÀ TRIỂN KHAI

## 5.1. Thiết kế giao diện — Phía người dùng

### 5.1.1. Trang chủ (Home)

> **Hình 5.1.** Trang chủ — gồm Hero carousel (lấy từ API admin quản lý), phần "Hành trình theo phong cách", phần "Gợi ý nổi bật" (lấy từ `/api/recommendations`).

Các thành phần:
- **HeroSlideshow**: hiển thị danh sách `hero_slides` đang active, tự động rotate 2s, có dots điều hướng.
- **Section "Hành trình theo phong cách"**: 3 chip (Thiên nhiên / Văn hoá / Nghỉ dưỡng) → link tới `/recommendations`.
- **Section "Gợi ý nổi bật"**: 3 card recommendation mới nhất.

### 5.1.2. Trang đăng nhập / đăng ký

> **Hình 5.2, 5.3.** Form đăng nhập/đăng ký.

Trường dữ liệu:
- Đăng nhập: email + password.
- Đăng ký: name + email + password (tối thiểu 8 ký tự theo validate phía client).

### 5.1.3. Trang tạo chuyến đi

> **Hình 5.4.** Form tạo chuyến đi.

Form gồm:
- Điểm đến (text).
- Ngày bắt đầu, ngày kết thúc (date picker).
- Số người (number, min 1).
- Ngân sách (text free-form, ví dụ "10-15 triệu").
- Sở thích (textarea).

Khi submit:
- Loading spinner trong khi chờ AI (có thể mất 5-15s với Gemini).
- Thành công → redirect `/trips/:id`.
- Lỗi → toast lỗi.

### 5.1.4. Trang chi tiết chuyến đi

> **Hình 5.5.** Hiển thị toàn bộ lịch trình dạng accordion theo ngày. Mỗi activity có time, title, description, location, cost, transport.

### 5.1.5. Trang chuyến đi của tôi

> **Hình 5.6.** Bảng/bộ sưu tập các trip đã tạo, có nút xoá và xem chi tiết.

### 5.1.6. Trang khám phá (Discover)

> **Hình 5.7.** Lưới các recommendation đã publish. Có:
> - Thanh tìm kiếm (filter theo title, destination, description).
> - Chips filter category: ALL / NATURE / CULTURE / RESORT / ADVENTURE / BEACH.
> - Mỗi card có ảnh, tiêu đề, điểm đến, rating, giá, badge category.

### 5.1.7. Trang chi tiết Recommendation

> **Hình 5.8.** Hero ảnh + nội dung JSON parsed hiển thị tương tự trip detail. Có nút yêu thích (FavoriteButton) trên hero.

### 5.1.8. Trang hồ sơ

> **Hình 5.9.** Form sửa tên, ngôn ngữ, avatar. Form đổi mật khẩu (currentPassword + newPassword).

## 5.2. Thiết kế giao diện — Phía quản trị

### 5.2.1. Admin Dashboard

> **Hình 5.10.** 4 thẻ thống kê (users, trips, recs, publishedRecs) + danh sách recent recs.

### 5.2.2. Admin Users

> **Hình 5.11.** Bảng users: name, email, role, status, createdAt. Có nút khoá/mở khoá + xoá.

Modal xác nhận + nhập lý do khoá.

### 5.2.3. Admin Trips

> **Hình 5.14.** Bảng tất cả trips của mọi user: destination, dates, owner, createdAt. Có nút xoá.

### 5.2.4. Admin Recommendations

> **Hình 5.12.** Bảng recs: title, destination, category badge, publish toggle, edit, delete.

### 5.2.5. Admin Recommendation Form

> **Hình 5.13.** Form đầy đủ: title, description, destination, image URL, category, price, rating, reviewCount, content JSON, isPublished toggle.

### 5.2.6. Admin Analytics

> **Hình 5.15.** Bốn block:
> - 4 thẻ thống kê tổng (totalUsers, totalTrips, totalRecommendations, totalFavorites, lockedUsers).
> - Biểu đồ đường: 6 tháng gần nhất (monthlyTrips).
> - Pie/bar: recs theo category.
> - Top 5 điểm đến nhiều trip nhất.
> - Recent trips + recent signups.

### 5.2.7. Admin Hero Carousel

> **Hình 5.16.** Bảng slide với:
> - Cột Order: 2 nút ↑/↓ + số sortOrder.
> - Cột Preview: thumbnail.
> - Cột URL: monospace truncated.
> - Cột Status: badge active/locked.
> - Cột Actions: Activate/Deactivate, Edit (modal), Delete (confirm).

## 5.3. Luồng triển khai (Deployment)

### 5.3.1. Cấu trúc thư mục

```
TravelMind/
├── apps/
│   ├── api/                 # NestJS backend
│   │   ├── src/             # Modules: auth, users, trips, ai, recommendations, admin, chat, favorites, hero
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── seed.ts
│   │   │   └── migrations/
│   │   └── package.json
│   └── web/                 # React frontend (Vite)
│       └── src/
│           ├── components/
│           ├── layouts/
│           ├── pages/
│           ├── admin/
│           ├── services/
│           ├── store/
│           ├── types/
│           ├── i18n/
│           ├── App.tsx
│           └── main.tsx
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   ├── docker-compose.yml
│   └── nginx.conf
├── package.json
└── pnpm-workspace.yaml
```

### 5.3.2. Docker Compose

File `docker/docker-compose.yml` định nghĩa 3 services:
- **postgres** (`postgres:16-alpine`): DB, volume `postgres-data`, healthcheck `pg_isready`.
- **api** (`travelmind-api`): build từ `docker/Dockerfile.api`. CMD chạy `prisma migrate deploy` rồi `prisma db seed` rồi `node dist/main.js`.
- **web** (`travelmind-web`): build từ `docker/Dockerfile.web`. Nginx serve SPA build, reverse-proxy `/api` về api container.

### 5.3.3. Biến môi trường

| Biến | Mặc định | Mô tả |
|---|---|---|
| `PORT` | 3000 | API port |
| `DATABASE_URL` | `postgresql://travelmind:travelmind@postgres:5432/travelmind` | Connection string |
| `JWT_SECRET` | (required) | Secret ký JWT |
| `JWT_EXPIRES_IN` | 7d | Thời hạn token |
| `CORS_ORIGINS` | http://localhost:5173 | CORS origin |
| `AI_PROVIDER` | gemini | mock / gemini / openai / ollama |
| `AI_API_KEY` | "" | Key cho Gemini/OpenAI |
| `AI_MODEL` | gemini-2.5-flash | Model name |
| `OLLAMA_BASE_URL` | http://host.docker.internal:11434 | Ollama local |
| `OLLAMA_MODEL` | qwen2.5:7b | Model Ollama |
| `SEED_ADMIN_EMAIL` | admin@travelmind.local | Tài khoản admin seed |
| `SEED_ADMIN_PASSWORD` | Admin@123456 | Mật khẩu admin seed |
| `SEED_ADMIN_NAME` | Admin | Tên admin seed |
| `SEED_ON_BOOT` | true | Có seed khi boot không |

### 5.3.4. Tài khoản seed mặc định

| Role | Email | Password |
|---|---|---|
| Admin | admin@travelmind.local | Admin@123456 |
| User | user@travelmind.local | User@123456 |

---

# CHƯƠNG 6: KIỂM THỬ VÀ ĐÁNH GIÁ

## 6.1. Chiến lược kiểm thử

- **Kiểm thử đơn vị (Unit test)**: hiện chưa có trong codebase (chưa được cấu hình). Có thể bổ sung bằng Jest + supertest.
- **Kiểm thử tích hợp (Integration test)**: chưa có.
- **Kiểm thử thủ công (Manual)**: thực hiện qua Docker Compose, Postman test API, kiểm tra UI.

## 6.2. Ca kiểm thử chức năng

### 6.2.1. Đăng nhập

**Bảng 6.1.** Ca kiểm thử đăng nhập.

| STT | Mô tả | Input | Expected | Kết quả |
|---|---|---|---|---|
| 1 | Đăng nhập admin thành công | admin@travelmind.local / Admin@123456 | 200 + JWT | ✅ |
| 2 | Đăng nhập user thành công | user@travelmind.local / User@123456 | 200 + JWT | ✅ |
| 3 | Sai mật khẩu | admin@travelmind.local / wrongpass | 401 "Invalid credentials" | ✅ |
| 4 | Email không tồn tại | unknown@x.com / any | 401 "Invalid credentials" | ✅ |
| 5 | Tài khoản bị khoá | user bị khoá | 423 + AccountLockedException | ✅ |

### 6.2.2. Tạo chuyến đi

**Bảng 6.2.** Ca kiểm thử tạo chuyến đi.

| STT | Mô tả | Input | Expected | Kết quả |
|---|---|---|---|---|
| 1 | Tạo thành công (Gemini có key) | destination="Đà Lạt", startDate=tomorrow, endDate=+3d | 201 + trip + itinerary | ✅ |
| 2 | Tạo thành công (Mock fallback) | như trên, AI_API_KEY="" | 201, mock sinh JSON | ✅ |
| 3 | endDate < startDate | startDate=later, endDate=earlier | 400 "endDate must be on or after startDate" | ✅ |
| 4 | Không có quyền (no JWT) | — | 401 | ✅ |

### 6.2.3. Chat với trợ lý

**Bảng 6.3.** Ca kiểm thử chat.

| STT | Mô tả | Input | Expected | Kết quả |
|---|---|---|---|---|
| 1 | Tạo phiên mới | POST /chat/sessions | 201 + session | ✅ |
| 2 | Gửi message đầu | POST /chat/sessions/:id/messages {content:"Xin chào"} | 200 {userMessage, assistantMessage}; session.title="Xin chào" | ✅ |
| 3 | Lấy lịch sử | GET /chat/sessions/:id/messages | 200 array | ✅ |
| 4 | Xoá phiên | DELETE /chat/sessions/:id | 204 | ✅ |
| 5 | Phiên không thuộc user | dùng sessionId của user khác | 404 "Chat session not found" | ✅ |

### 6.2.4. Quản lý Recommendation (Admin)

**Bảng 6.4.** Ca kiểm thử quản lý rec (Admin).

| STT | Mô tả | Expected | Kết quả |
|---|---|---|---|
| 1 | Tạo rec mới | 201, xuất hiện trong admin list | ✅ |
| 2 | Publish | isPublished=true, xuất hiện ở /recommendations public | ✅ |
| 3 | Unpublish | isPublished=false, biến mất ở public | ✅ |
| 4 | Sửa | update fields | ✅ |
| 5 | Xoá | 200 deleted, biến mất ở public | ✅ |

## 6.3. Kết quả kiểm thử

Toàn bộ các ca kiểm thử chức năng chính đều pass. Hệ thống chạy ổn định trong Docker Compose. Performance chấp nhận được:
- API thường: < 200ms.
- AI generate itinerary: 3–15s tuỳ provider.
- AI chat: 2–8s.

## 6.4. Đánh giá ưu/nhược

### Ưu điểm
- Kiến trúc rõ ràng, dễ bảo trì.
- Pluggable AI provider.
- Đa ngôn ngữ, dark mode.
- Validation nghiêm ở cả backend lẫn frontend.
- Docker Compose single-command deploy.

### Nhược điểm / Hạn chế
- Chưa có test tự động (unit/integration).
- AI chat history cố định 20 messages.
- AI phụ thuộc provider bên ngoài (chi phí + privacy).
- Image upload chưa hỗ trợ — admin dán URL.
- WebSocket / real-time notification chưa có.

---

# CHƯƠNG 7: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

## 7.1. Kết luận

### 7.1.1. Về mặt lý thuyết

Đề tài đã hệ thống hoá quy trình tích hợp mô hình ngôn ngữ lớn (LLM) vào ứng dụng web thương mại, bao gồm:
- Thiết kế **pluggable provider pattern** cho phép swap AI provider không ảnh hưởng business logic.
- Xây dựng quy trình **prompt engineering → structured output (JSON) → normalize → lưu DB → render UI**.
- Áp dụng **kiến trúc monorepo pnpm workspace** cho dự án full-stack.

### 7.1.2. Về mặt thực tiễn

Hệ thống TravelMind đã hoàn thiện các chức năng:
- ✅ Quản lý tài khoản (đăng ký, đăng nhập, hồ sơ, đổi mật khẩu, khoá/mở khoá).
- ✅ Sinh lịch trình du lịch bằng AI với 4 provider (Gemini/OpenAI/Ollama/Mock).
- ✅ Khám phá gợi ý du lịch, yêu thích.
- ✅ Chat với trợ lý AI có lưu lịch sử.
- ✅ Dashboard quản trị + Analytics.
- ✅ Quản lý Hero carousel trang chủ.
- ✅ Đa ngôn ngữ Vi/An, Dark/Light mode.
- ✅ Triển khai Docker Compose 1 lệnh.

### 7.1.3. So sánh với mục tiêu đề ra

| Mục tiêu | Trạng thái |
|---|---|
| Backend REST API NestJS + Prisma + PostgreSQL | ✅ Hoàn thành |
| Frontend React + responsive + i18n | ✅ Hoàn thành |
| AI provider abstraction | ✅ Hoàn thành |
| Docker Compose deploy | ✅ Hoàn thành |
| Dashboard quản trị | ✅ Hoàn thành |
| Unit/Integration test | ❌ Chưa có (Phase 2) |

## 7.2. Hướng phát triển

### 7.2.1. Phase 2 (ngắn hạn)

- **Bổ sung test tự động**: Jest + supertest cho backend, Vitest + React Testing Library cho frontend.
- **Upload ảnh thật** thay vì paste URL: tích hợp S3/MinIO hoặc local static serve.
- **Pagination / Infinite scroll** cho danh sách recommendations & trips.
- **Search nâng cao**: full-text search với Postgres tsvector.
- **WebSocket** cho notification + chat streaming.
- **Email verification + reset password**.

### 7.2.2. Phase 3 (trung hạn)

- **Booking integration**: liên kết booking hotel/vé máy bay qua API bên thứ ba.
- **Thanh toán**: Stripe/VNPay.
- **Google Places API** cho điểm đến thực.
- **Map view** cho itinerary.
- **Weather API** cho dự báo thời tiết.
- **Mobile app** React Native (share API + business logic).

### 7.2.3. Phase 4 (dài hạn)

- **Recommendation engine** riêng: collaborative filtering + LLM augmentation.
- **Multi-tenancy** cho phép nhiều "agency" dùng chung 1 instance.
- **Analytics nâng cao**: cohort analysis, funnel, retention.
- **Auto-scaling**: Kubernetes manifests.

---

# TÀI LIỆU THAM KHẢO

1. **NestJS Documentation** (2024). https://docs.nestjs.com
2. **Prisma Documentation** (2024). https://www.prisma.io/docs
3. **React Documentation** (2024). https://react.dev
4. **Vite Documentation** (2024). https://vitejs.dev
5. **TailwindCSS Documentation** (2024). https://tailwindcss.com/docs
6. **React Router Documentation** (2024). https://reactrouter.com
7. **Google Gemini API Documentation** (2024). https://ai.google.dev/docs
8. **OpenAI API Documentation** (2024). https://platform.openai.com/docs
9. **PostgreSQL Documentation** (2024). https://www.postgresql.org/docs
10. **Docker Documentation** (2024). https://docs.docker.com
11. **i18next Documentation** (2024). https://www.i18next.com
12. **JWT (RFC 7519)**, IETF. https://datatracker.ietf.org/doc/html/rfc7519
13. **bcrypt algorithm**, Niels Provos, David Mazières (1999).
14. **Booch, Grady; Rumbaugh, James; Jacobson, Ivar** (2005). *The Unified Modeling Language User Guide*. Addison-Wesley.
15. **Sommerville, Ian** (2015). *Software Engineering* (10th Edition). Pearson.

---

# PHỤ LỤC

## Phụ lục A — Cài đặt và chạy hệ thống

### A.1. Yêu cầu môi trường

- Node.js >= 20
- pnpm >= 9
- Docker + Docker Compose

### A.2. Chạy với Docker (khuyến nghị)

```bash
git clone <repo>
cd TravelMind
docker compose -f docker/docker-compose.yml up --build
```

Web: http://localhost:5173 — API: http://localhost:3000/api/health

### A.3. Chạy không Docker

```bash
pnpm install
pnpm prisma:migrate --name init
pnpm prisma:seed
pnpm dev:api      # terminal 1
pnpm dev:web      # terminal 2
```

## Phụ lục B — Cấu trúc Prisma schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole { USER  ADMIN }
enum UserStatus { ACTIVE  LOCKED }
enum TripStatus { DRAFT  GENERATED  ARCHIVED }
enum RecCategory { NATURE  CULTURE  RESORT  ADVENTURE  BEACH }
enum ChatRole { USER  ASSISTANT  SYSTEM }

model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String
  role         UserRole      @default(USER)
  status       UserStatus    @default(ACTIVE)
  language     String        @default("vi")
  avatar       String        @default("")
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  trips        Trip[]
  favorites    Favorite[]
  chatSessions ChatSession[]
  @@map("users")
}

model Trip {
  id           String        @id @default(cuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  destination  String
  startDate    DateTime
  endDate      DateTime
  travelers    Int
  budget       String
  preferences  String        @default("")
  status       TripStatus    @default(DRAFT)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  itineraries  Itinerary[]
  @@index([userId])
  @@map("trips")
}

model Itinerary {
  id          String   @id @default(cuid())
  tripId      String
  trip        Trip     @relation(fields: [tripId], references: [id], onDelete: Cascade)
  title       String
  description String   @default("")
  content     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@index([tripId])
  @@map("itineraries")
}

model Recommendation {
  id          String     @id @default(cuid())
  title       String
  description String
  destination String
  image       String     @default("")
  content     String
  isPublished Boolean    @default(false)
  category    RecCategory @default(NATURE)
  price       Int        @default(0)
  rating      Float      @default(4.5)
  reviewCount Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  favorites   Favorite[]
  @@index([isPublished])
  @@index([category])
  @@map("recommendations")
}

model Favorite {
  id               String         @id @default(cuid())
  userId           String
  user             User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  recommendationId String
  recommendation   Recommendation @relation(fields: [recommendationId], references: [id], onDelete: Cascade)
  createdAt        DateTime       @default(now())
  @@unique([userId, recommendationId])
  @@index([userId])
  @@map("favorites")
}

model ChatSession {
  id        String        @id @default(cuid())
  userId    String
  user      User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String        @default("")
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  messages  ChatMessage[]
  @@index([userId, updatedAt])
  @@map("chat_sessions")
}

model ChatMessage {
  id        String      @id @default(cuid())
  sessionId String
  session   ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  role      ChatRole
  content   String
  createdAt DateTime    @default(now())
  @@index([sessionId, createdAt])
  @@map("chat_messages")
}

model HeroSlide {
  id        String   @id @default(cuid())
  imageUrl  String
  sortOrder Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([isActive, sortOrder])
  @@map("hero_slides")
}
```

## Phụ lục C — Danh sách i18n namespace

- `common.*` — nhãn chung (appName, back, save, cancel).
- `nav.*` — menu điều hướng.
- `home.*` — trang chủ.
- `discover.*` — trang khám phá.
- `recs.*` — recommendation detail.
- `createTrip.*`, `trips.*`, `tripDetail.*` — quản lý chuyến đi.
- `profile.*`, `profileEdit.*` — hồ sơ.
- `login.*`, `register.*`, `auth.*` — xác thực.
- `chat.*` — chat widget.
- `footer.*` — footer.
- `admin.*` — toàn bộ phần admin (navDashboard, navUsers, navHero, …).

---

> **Ghi chú cuối:** Báo cáo này được biên soạn dựa trên codebase thực tế của TravelMind (MVP / Phase 1) tại thời điểm [ngày bảo vệ]. Mọi sơ đồ UML sử dụng cú pháp Mermaid — khi chuyển sang Word có thể dùng plugin "Mermaid" hoặc render online tại https://mermaid.live rồi chèn ảnh.