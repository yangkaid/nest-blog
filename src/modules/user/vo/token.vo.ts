import { ApiProperty } from '@nestjs/swagger';

export class TokenItem {
  @ApiProperty({ description: 'token', example: 'asfadasasda' })
  token: TokenItem;
}

export class TokenVO {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;
}

export class TokenResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '数据', example: TokenVO })
  data: TokenVO;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
