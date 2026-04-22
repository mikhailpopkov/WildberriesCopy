import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SessionInfo } from '../auth/session-info.decorator';
import { SessionDto } from '../auth/dto';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { GoodsService } from './goods.service';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GoodEntity } from './good.entity';

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  @ApiOperation({ summary: 'Список всех товаров' })
  @ApiOkResponse({ type: GoodEntity, isArray: true })
  findAll() {
    return this.goodsService.findAll();
  }

  @Get('my')
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Товары текущего пользователя' })
  @ApiOkResponse({ type: GoodEntity, isArray: true })
  @ApiUnauthorizedResponse()
  findMy(@SessionInfo() session: SessionDto) {
    return this.goodsService.findByUserId(session.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Товар по id' })
  @ApiParam({ name: 'id', description: 'Идентификатор товара' })
  @ApiOkResponse({ type: GoodEntity })
  @ApiNotFoundResponse({ description: 'Товар не найден' })
  async findOne(@Param('id') id: string) {
    const good = await this.goodsService.findOne(id);
    if (!good) {
      throw new NotFoundException();
    }
    return good;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Создать товар' })
  @ApiCreatedResponse({ type: GoodEntity })
  @ApiUnauthorizedResponse()
  create(@SessionInfo() session: SessionDto, @Body() dto: CreateGoodDto) {
    return this.goodsService.create(session.id, dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Обновить товар' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GoodEntity })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse({
    description: 'Товар принадлежит другому пользователю',
  })
  @ApiUnauthorizedResponse()
  update(
    @Param('id') id: string,
    @SessionInfo() session: SessionDto,
    @Body() dto: UpdateGoodDto,
  ) {
    return this.goodsService.update(id, session.id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GoodEntity, description: 'Удалённый товар' })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse({
    description: 'Товар принадлежит другому пользователю',
  })
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string, @SessionInfo() session: SessionDto) {
    return this.goodsService.remove(id, session.id);
  }
}
