<?php
declare(strict_types=1);

namespace Tests\Cases\NoteTypes;

use AmoCRM\Exceptions\InvalidArgumentException;
use AmoCRM\Models\CustomFieldsValues\ValueModels\DateCustomFieldValueModel;
use Carbon\Carbon;
use DateTime;
use DateTimeInterface;
use PHPUnit\Framework\TestCase;
use stdClass;

final class DateCustomFieldValueModelTest extends TestCase
{
    /**
     * @return array
     */
    public function getInvalidDates(): array
    {
        return [
            ['$test'], // spec symbols
            ['request_id'], // underscore
            ['идентификатор'], // cyrillic
            ['request id'], // whitespace
            [null], // null
            [[123]], // array
            [false], // bool
            [new stdClass()] //object
        ];
    }

    /**
     * @return array
     */
    public function getValidDates(): array
    {
        return [
            [1596187802],
            ['2020-02-27 10:00:00'],
            ['next monday'],
            ['Mon, 30 Jun 2014 11:30:00 +0400'],
            ['2020-08-23'],
            ['0'],
            [new Carbon()],
            [new DateTime()],
            [Carbon::now()],
        ];
    }

    /**
     * @dataProvider getInvalidDates
     *
     * @param mixed $date
     */
    public function testInvalidDate($date): void
    {
        $this->expectException(InvalidArgumentException::class);
        (new DateCustomFieldValueModel())->setValue($date);
    }

    /**
     * @dataProvider getValidDates
     *
     * @param mixed $date
     *
     * @throws InvalidArgumentException
     */
    public function testValidDate($date): void
    {
        $dateField = (new DateCustomFieldValueModel())->setValue($date);
        $value = $dateField->getValue();

        $this->assertInstanceOf(DateTimeInterface::class, $value);
    }


    /**
     * @dataProvider getValidDates
     *
     * @param mixed $date
     *
     * @throws InvalidArgumentException
     */
    public function testValidDateApi($date): void
    {
        $dateField = (new DateCustomFieldValueModel())->setValue($date);

        $value = $dateField->toApi()['value'];
        $dateTime = DateTime::createFromFormat(DateTime::RFC3339, $value);
        $this->assertInstanceOf(DateTimeInterface::class, $dateTime);
    }
}
