import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('测试')
@Controller('test')
export class TestController {
  @ApiOperation({ summary: '测试接口' })
  @ApiOkResponse({ type: Number })
  @Get('test')
  async test() {
    return 'xxx';
  }
}
